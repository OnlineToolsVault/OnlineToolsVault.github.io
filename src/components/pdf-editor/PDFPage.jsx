import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor } from './EditorContext';
import { Canvas, Image as FabricImage, IText, Rect, Circle, PencilBrush } from 'fabric';

// Rasterizing a page allocates a full-page bitmap, so run the pages one at a
// time instead of firing N render tasks in the same tick.
let renderQueue = Promise.resolve();

// Upper bound on a single rasterized page, so zooming in cannot blow up memory
const MAX_RENDER_PIXELS = 4e6;

// Keystrokes are coalesced into a single history entry after this quiet period
const TYPING_HISTORY_DELAY = 600;

const PDFPage = ({ page, pageIndex }) => {
    const canvasRef = useRef(null);
    const {
        scale, registerCanvas, unregisterCanvas, activeTool, activeColor, activeSize,
        activeStrokeColor, activeStrokeWidth, highlightOpacity,
        setSelectedObjectId, pushHistory, nearRange
    } = useEditor();

    const isNear = pageIndex >= nearRange.start && pageIndex <= nearRange.end;

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

        // Mark paths created with the highlight tool. This must be 'before:path:created':
        // PencilBrush fires that before canvas.add(), whereas 'path:created' fires only after
        // 'object:added' has already snapshotted the path — the flag would then be missing from
        // that snapshot and the Opacity control would vanish for the stroke after an undo.
        fCanvas.on('before:path:created', (e) => {
            if (e.path && activeToolRef.current === 'highlight') {
                e.path.isHighlight = true;
            }
        });

        // Undo/redo history: snapshot the page after every completed mutation
        pushHistory(pageIndex, fCanvas); // baseline, so the first Undo has somewhere to land
        const record = (e) => {
            const target = e && e.target;
            const isText = !!(target && target.isType && target.isType('i-text'));
            // A still-empty text box is a half-finished action, not one to undo. But once its text
            // has reached a snapshot, emptying it IS a real edit — otherwise deleting all the text
            // is never recorded and Undo silently does nothing.
            if (isText && !target.text && !target.hasBeenRecorded) return;
            if (isText && target.text) target.hasBeenRecorded = true;
            pushHistory(pageIndex, fCanvas);
        };

        // 'text:changed' fires on every keystroke. One snapshot per character
        // would evict the whole stack, so coalesce a typing burst into one entry.
        let typingTimer = null;
        let typingTarget = null;
        const flushTyping = () => {
            if (typingTimer === null) return;
            clearTimeout(typingTimer);
            typingTimer = null;
            const target = typingTarget;
            typingTarget = null;
            record({ target });
        };
        const recordTyping = (e) => {
            typingTarget = e && e.target;
            if (typingTimer !== null) clearTimeout(typingTimer);
            typingTimer = setTimeout(flushTyping, TYPING_HISTORY_DELAY);
        };

        fCanvas.on('object:added', record);
        fCanvas.on('object:removed', record);
        fCanvas.on('object:modified', record);
        fCanvas.on('text:changed', recordTyping);
        fCanvas.on('text:editing:exited', flushTyping);

        return () => {
            log("[Fabric Init] Disposing Fabric Canvas...");
            if (typingTimer !== null) clearTimeout(typingTimer);
            fCanvas.off('object:added', record);
            fCanvas.off('object:removed', record);
            fCanvas.off('object:modified', record);
            fCanvas.off('text:changed', recordTyping);
            fCanvas.off('text:editing:exited', flushTyping);
            fCanvas.dispose();
            fabricCanvasRef.current = null;
            unregisterCanvas(pageIndex);
        };
    }, [pageIndex, registerCanvas, unregisterCanvas, pushHistory]); // Depend on stable props

    // Drop the page bitmap without touching the user's annotations
    const releaseBackground = useCallback(() => {
        const fCanvas = fabricCanvasRef.current;
        const bg = fCanvas && fCanvas.backgroundImage;
        if (!bg) return;

        fCanvas.backgroundImage = null;
        fCanvas.requestRenderAll();

        const el = bg.getElement ? bg.getElement() : null;
        if (el && el.tagName === 'CANVAS') {
            // Zeroing the element frees the backing store right away
            el.width = 0;
            el.height = 0;
        }
    }, []);

    // Fabric keeps a lower + upper canvas per page, both at devicePixelRatio, so
    // a long document retains tens of MB per page even with the page raster gone.
    // Zeroing the backing stores of far-away pages costs nothing to undo: the CSS
    // size (and therefore the layout) stays, the object model stays, the canvas
    // stays registered for export, and the next setDimensions() call below
    // reallocates the pixels when the page comes back into range.
    const releaseBitmaps = useCallback(() => {
        const fCanvas = fabricCanvasRef.current;
        if (!fCanvas) return;
        [fCanvas.lowerCanvasEl, fCanvas.upperCanvasEl].forEach(el => {
            if (el && el.width !== 0) {
                el.width = 0;
                el.height = 0;
            }
        });
    }, []);

    // -------------------------------------------------------------------------
    // 2. PDF Rendering & Update Effect (Runs on scale/page/visibility change)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!page) return;
        let isCancelled = false;

        const log = (msg) => window.__PDF_LOGS ? window.__PDF_LOGS.push(`[${Date.now()}] ${msg}`) : null;

        const currentScale = renderedScale;
        const displayViewport = page.getViewport({ scale: currentScale });

        // Size the canvas even for pages we are not rasterizing, so the scroll
        // container keeps the right height and objects follow a zoom change.
        const fCanvas = fabricCanvasRef.current;
        if (fCanvas) {
            const prevWidth = fCanvas.width;
            const newWidth = displayViewport.width;
            const newHeight = displayViewport.height;
            const scaleFactor = prevWidth > 0 ? newWidth / prevWidth : 1;

            fCanvas.setDimensions({ width: newWidth, height: newHeight });

            // The previous raster keeps painting until this page reaches the front
            // of the render queue, so stretch it to the new size straight away.
            // Otherwise a zoom leaves white gutters on every visible page.
            const bg = fCanvas.backgroundImage;
            if (bg && bg.width > 0 && bg.height > 0) {
                bg.scaleX = newWidth / bg.width;
                bg.scaleY = newHeight / bg.height;
            }

            // Rescale Objects if this was a Zoom operation (heuristic: prevWidth > 0)
            if (prevWidth > 0 && prevWidth !== newWidth) {
                fCanvas.getObjects().forEach(obj => {
                    obj.left *= scaleFactor;
                    obj.top *= scaleFactor;
                    obj.scaleX *= scaleFactor;
                    obj.scaleY *= scaleFactor;
                    obj.setCoords();
                });
            }
            fCanvas.requestRenderAll();
        }

        if (!isNear) {
            releaseBackground();
            releaseBitmaps();
            return;
        }

        const renderPage = async () => {
            if (isCancelled) return;
            log(`[Render] Starting. Index: ${pageIndex}, Scale: ${currentScale}`);

            const pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
            let finalRenderScale = currentScale * pixelRatio;
            const probe = page.getViewport({ scale: finalRenderScale });
            const pixels = probe.width * probe.height;
            if (pixels > MAX_RENDER_PIXELS) {
                finalRenderScale *= Math.sqrt(MAX_RENDER_PIXELS / pixels);
            }
            const renderViewport = page.getViewport({ scale: finalRenderScale });

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
            const target = fabricCanvasRef.current;
            if (!target) {
                log("[Render] Warning: Fabric canvas ref missing during render update");
                return;
            }

            try {
                const img = new FabricImage(tempCanvas);
                img.scaleX = target.width / img.width;
                img.scaleY = target.height / img.height;
                img.excludeFromExport = true; // never serialize the page raster
                target.backgroundImage = img;
                target.requestRenderAll();
                log("[Render] Background updated");
            } catch (err) {
                console.error("Error setting background image", err);
            }
        };

        renderQueue = renderQueue
            .then(renderPage)
            .catch(err => console.error("PDF Render Error:", err));

        return () => {
            isCancelled = true;
        };
    }, [page, pageIndex, renderedScale, isNear, releaseBackground, releaseBitmaps]);


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
                const text = new IText('', {
                    left: pointer.x,
                    top: pointer.y,
                    fontFamily: 'Helvetica',
                    fill: color,
                    fontSize: size
                });
                // Drop the box again if the user clicks away without typing
                text.on('editing:exited', () => {
                    if (!text.text || !text.text.trim()) {
                        canvas.remove(text);
                        canvas.requestRenderAll();
                    }
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

    return (
        <div
            id={`pdf-page-${pageIndex}`}
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
