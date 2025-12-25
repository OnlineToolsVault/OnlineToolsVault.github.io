import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from './EditorContext';
import * as pdfjsLib from 'pdfjs-dist';
import { Canvas, Image as FabricImage, IText, Rect, Circle, PencilBrush } from 'fabric';

const PDFPage = ({ page, pageIndex }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const {
        scale, registerCanvas, unregisterCanvas, activeTool, activeColor, activeSize,
        activeStrokeColor, activeStrokeWidth, highlightOpacity,
        setSelectedObjectId, setActivePageIndex
    } = useEditor();

    const fabricCanvasRef = useRef(null);
    const activeToolRef = useRef(activeTool); // Ref to track current tool for event handlers

    // State for the scale we are CURRENTLY rendered at
    // We initialize with 'scale' so first render is sharp.
    const [renderedScale, setRenderedScale] = useState(scale);

    // Debounce reference
    const debounceTimer = useRef(null);

    // Effect: Handle Scale Changes with Debounce
    useEffect(() => {
        // Clear pending
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        // If scale changed significantly, debounce a re-render
        if (scale !== renderedScale) {
            debounceTimer.current = setTimeout(() => {
                setRenderedScale(scale);
            }, 300); // 300ms wait
        }

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [scale, renderedScale]);

    // -------------------------------------------------------------------------
    // 1. Fabric Initialization Effect (Runs once on mount)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!canvasRef.current) return;

        // Init logging
        if (!window.__PDF_LOGS) window.__PDF_LOGS = [];
        const log = (msg) => window.__PDF_LOGS.push(`[${Date.now()}] ${msg}`);

        log("[Fabric Init] Initializing Fabric Canvas...");

        const fCanvas = new Canvas(canvasRef.current, {
            selection: true
        });

        fabricCanvasRef.current = fCanvas;
        registerCanvas(pageIndex, fCanvas);

        // Attach Initial Events
        updateDrawingMode(fCanvas, activeTool, activeColor, activeSize);
        attachMouseEvents(fCanvas, activeTool, activeColor, activeSize);

        fCanvas.on('selection:created', (e) => {
            if (e.selected && e.selected.length > 0) setSelectedObjectId(e.selected[0]);
        });
        fCanvas.on('selection:updated', (e) => {
            if (e.selected && e.selected.length > 0) setSelectedObjectId(e.selected[0]);
        });
        fCanvas.on('selection:cleared', () => setSelectedObjectId(null));

        // Mark paths created with highlight tool (using ref for current value)
        fCanvas.on('path:created', (e) => {
            if (e.path && activeToolRef.current === 'highlight') {
                e.path.isHighlight = true;
            }
        });

        return () => {
            log("[Fabric Init] Disposing Fabric Canvas...");
            fCanvas.dispose();
            fabricCanvasRef.current = null;
            unregisterCanvas(pageIndex);
        };
    }, [pageIndex, registerCanvas, unregisterCanvas]); // Depend on stable props

    // -------------------------------------------------------------------------
    // 2. PDF Rendering & Update Effect (Runs on scale/page change)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!page) return;
        let isCancelled = false;

        const log = (msg) => window.__PDF_LOGS ? window.__PDF_LOGS.push(`[${Date.now()}] ${msg}`) : null;

        const renderPage = async () => {
            log(`[Render] Starting. Index: ${pageIndex}, Scale: ${renderedScale}`);

            // Wait for Fabric to be ready (it should be since effect 1 runs first typically, but ref might be laggy)
            // Actually, in React 18, effects run in order.

            const currentScale = renderedScale;
            const pixelRatio = window.devicePixelRatio || 1;
            const targetScale = Math.max(pixelRatio, 2);
            const finalRenderScale = currentScale * targetScale;

            const renderViewport = page.getViewport({ scale: finalRenderScale });
            const displayViewport = page.getViewport({ scale: currentScale });

            // 1. Render High-Res PDF to Offscreen Canvas
            const tempCanvas = document.createElement('canvas');
            const tempContext = tempCanvas.getContext('2d');
            tempCanvas.height = renderViewport.height;
            tempCanvas.width = renderViewport.width;

            const renderContext = {
                canvasContext: tempContext,
                viewport: renderViewport,
            };

            try {
                await page.render(renderContext).promise;
            } catch (err) {
                if (!isCancelled) console.error("PDF Render Error:", err);
                return;
            }

            if (isCancelled) return;

            // 2. Update Fabric Canvas Background
            const fCanvas = fabricCanvasRef.current;
            if (!fCanvas) {
                log("[Render] Warning: Fabric canvas ref missing during render update");
                return;
            }

            // Update Dimensions
            const prevWidth = fCanvas.width;
            const prevHeight = fCanvas.height;
            const newWidth = displayViewport.width;
            const newHeight = displayViewport.height;
            const scaleFactor = prevWidth > 0 ? newWidth / prevWidth : 1;

            // If dimensions changed (Zooming)
            fCanvas.setDimensions({ width: newWidth, height: newHeight });

            // Set Background Image
            try {
                const img = new FabricImage(tempCanvas);
                img.scaleX = newWidth / img.width;
                img.scaleY = newHeight / img.height;
                fCanvas.backgroundImage = img;
                fCanvas.requestRenderAll();
                log("[Render] Background updated");
            } catch (err) {
                console.error("Error setting background image", err);
            }

            // Rescale Objects if this was a Zoom operation (heuristic: prevWidth > 0)
            // Note: On first load, prevWidth might be default/0.
            // But we can just rescale everything based on the ratio.
            if (prevWidth > 0 && prevWidth !== newWidth) {
                fCanvas.getObjects().forEach(obj => {
                    obj.left *= scaleFactor;
                    obj.top *= scaleFactor;
                    obj.scaleX *= scaleFactor;
                    obj.scaleY *= scaleFactor;
                    obj.setCoords();
                });
                fCanvas.requestRenderAll();
            }
        };

        renderPage();

        return () => {
            isCancelled = true;
        };
    }, [page, renderedScale]);


    // Helper to update drawing mode on a canvas
    const updateDrawingMode = (canvas, tool, color, size) => {
        if (!canvas) return;
        console.log(`[PDFPage] Updating Drawing Mode: Tool=${tool}, Color=${color}`);

        canvas.isDrawingMode = (tool === 'draw' || tool === 'highlight' || tool === 'eraser');

        if (tool === 'draw') {
            canvas.freeDrawingBrush = new PencilBrush(canvas);
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width = size;
        } else if (tool === 'highlight') {
            canvas.freeDrawingBrush = new PencilBrush(canvas);
            // Convert opacity percentage (0-100) to hex (00-FF)
            const opacityHex = Math.round((highlightOpacity / 100) * 255).toString(16).padStart(2, '0');
            canvas.freeDrawingBrush.color = color + opacityHex;
            canvas.freeDrawingBrush.width = size;
        } else if (tool === 'eraser') {
            canvas.freeDrawingBrush = new PencilBrush(canvas);
            canvas.freeDrawingBrush.color = '#ffffff';
            canvas.freeDrawingBrush.width = 20;
            canvas.freeDrawingBrush.shadow = null; // Fix artifacts
        }
        canvas.requestRenderAll();
    };

    // Effect to update drawing properties when they change (without re-init fabric)
    useEffect(() => {
        activeToolRef.current = activeTool; // Keep ref in sync
        updateDrawingMode(fabricCanvasRef.current, activeTool, activeColor, activeSize);
        // Also update click listeners
        attachMouseEvents(fabricCanvasRef.current, activeTool, activeColor, activeStrokeColor, activeSize, activeStrokeWidth);
    }, [activeTool, activeColor, activeStrokeColor, activeSize, activeStrokeWidth, highlightOpacity]);


    // Helper to attach mouse events
    const attachMouseEvents = (canvas, tool, color, strokeColor, size, strokeWidth) => {
        if (!canvas) return;
        console.log(`[PDFPage] Attaching Mouse Events for Tool: ${tool}`);

        canvas.off('mouse:down');
        canvas.on('mouse:down', (opt) => {
            console.log(`[PDFPage] Mouse Down Detected! Tool=${tool}, Target=`, opt.target);
            const pointer = canvas.getPointer(opt.e);
            console.log(`[PDFPage] Pointer:`, pointer);

            // If user clicks on an existing object, assume they want to select it.
            // Don't create new object on top.
            if (opt.target) return;

            if (tool === 'text') {
                console.log("[PDFPage] Creating Text Object");
                const text = new IText('Type here', {
                    left: pointer.x,
                    top: pointer.y,
                    fontFamily: 'Helvetica',
                    fill: color,
                    fontSize: size
                });
                canvas.add(text);
                canvas.setActiveObject(text);
                text.enterEditing();
                canvas.requestRenderAll(); // Ensure render
            } else if (tool === 'rect') {
                const rect = new Rect({
                    left: pointer.x,
                    top: pointer.y,
                    fill: color,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    width: 100,
                    height: 60
                });
                canvas.add(rect);
                canvas.setActiveObject(rect);
                canvas.requestRenderAll();
            } else if (tool === 'circle') {
                const circle = new Circle({
                    left: pointer.x,
                    top: pointer.y,
                    fill: color,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    radius: 50
                });
                canvas.add(circle);
                canvas.setActiveObject(circle);
                canvas.requestRenderAll();
            } else if (tool === 'redact') {
                const rect = new Rect({
                    left: pointer.x,
                    top: pointer.y,
                    fill: 'black',
                    stroke: 'black',
                    strokeWidth: 0,
                    width: 100,
                    height: 30,
                    rx: 2,
                    ry: 2,
                    isRedaction: true // Mark for secure flattening
                });
                canvas.add(rect);
                canvas.setActiveObject(rect);
                canvas.requestRenderAll();
            }
        });
    };


    // Calculate CSS transform based on difference between fluid 'scale' and 'renderedScale'
    // If rendered at 1.0, and zooming to 1.1, transform is 1.1/1.0 = 1.1
    // Guard against division by zero though scale shouldn't be 0
    const cssScale = renderedScale ? (scale / renderedScale) : 1;

    // Track visibility for active page index
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                    setActivePageIndex(pageIndex);
                }
            });
        }, {
            threshold: [0.1, 0.5, 0.9] // Multiple thresholds key
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [pageIndex, setActivePageIndex]);

    return (
        <div
            id={`pdf-page-${pageIndex}`}
            ref={containerRef}
            style={{
                marginBottom: '2rem',
                position: 'relative' // For absolute positioning if needed, but flex column is fine
            }}
        >
            {/* Page Number Label */}
            <div style={{
                textAlign: 'center',
                marginBottom: '0.5rem',
                color: '#64748b',
                fontWeight: '600',
                fontSize: '0.9rem',
                userSelect: 'none'
            }}>
                Page {pageIndex + 1}
            </div>

            <div style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                background: 'white',
                // Apply CSS Zoom
                transform: `scale(${cssScale})`,
                transformOrigin: 'top center',
                transition: scale !== renderedScale ? 'transform 0.2s ease-out' : 'none', // Smooth zoom, instant snap
                willChange: 'transform'
            }}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default PDFPage;
