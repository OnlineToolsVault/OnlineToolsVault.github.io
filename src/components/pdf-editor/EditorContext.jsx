import { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';

const EditorContext = createContext();

// Custom flags that must survive an undo/redo round-trip
const HISTORY_PROPS = ['isRedaction', 'isHighlight'];
const HISTORY_LIMIT = 50;
// Snapshots inline any added image as a data URL, so also cap the stack by size
const HISTORY_BYTES = 8e6;

// Serialize the user's annotations only. The page raster lives on the canvas as
// backgroundImage and would otherwise be embedded as a multi-megabyte data URL
// in every history entry.
const serializeCanvas = (canvas) => {
    const bg = canvas.backgroundImage;
    canvas.backgroundImage = null;
    const json = JSON.stringify(canvas.toObject(HISTORY_PROPS));
    canvas.backgroundImage = bg;
    return json;
};

export const EditorProvider = ({ children }) => {
    const [scale, setScale] = useState(1.0);
    const [activeTool, setActiveTool] = useState('select');
    const [activeColor, setActiveColor] = useState('#000000'); // Primarily Fill or Text Color
    const [activeStrokeColor, setActiveStrokeColor] = useState('#000000'); // Border Color
    const [activeSize, setActiveSize] = useState(20); // Font size or Brush size
    const [activeStrokeWidth, setActiveStrokeWidth] = useState(2); // Border thickness
    const [highlightOpacity, setHighlightOpacity] = useState(50); // Highlight opacity (0-100)

    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [pages, setPages] = useState([]); // Array of { pageNum, viewport, image }
    const [canvasRefs, setCanvasRefs] = useState({}); // Map page index to fabric canvas instance
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfDoc, setPdfDoc] = useState(null); // The loaded PDFDocument from pdf-lib
    const [fileName, setFileName] = useState('');
    // Pages close enough to the viewport to be worth rasterizing
    const [nearRange, setNearRange] = useState({ start: 0, end: 1 });

    // Undo/Redo history: one snapshot stack per page
    const historyRef = useRef({}); // { pageIndex: { stack: [{ json, width }], index } }
    const restoringRef = useRef(false); // suppress recording while a snapshot is applied
    const [historyTick, setHistoryTick] = useState(0); // re-renders consumers when a stack changes

    // Global Key Listener for Delete
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedObjectId && selectedObjectId.canvas) {
                    // Prevent deleting if user is typing in a text box
                    if (selectedObjectId.isEditing) return;

                    selectedObjectId.canvas.remove(selectedObjectId);
                    selectedObjectId.canvas.requestRenderAll();
                    setSelectedObjectId(null);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedObjectId]);

    // Helper to register a canvas instance
    const registerCanvas = useCallback((pageIndex, fabricCanvas) => {
        setCanvasRefs(prev => ({ ...prev, [pageIndex]: fabricCanvas }));
    }, []);

    const unregisterCanvas = useCallback((pageIndex) => {
        delete historyRef.current[pageIndex];
        setCanvasRefs(prev => {
            const newRefs = { ...prev };
            delete newRefs[pageIndex];
            return newRefs;
        });
    }, []);

    const addImage = useCallback((dataUrl) => {
        const canvas = canvasRefs[activePageIndex];
        if (!canvas) {
            console.error("No active canvas found to add image");
            alert("Scroll to the page you want the image on, then try again.");
            return;
        }

        // We can't import FabricImage here directly if we want to keep context pure JS/React
        // But we can assume the caller will handle usage, or we import it.
        // Better: Context shouldn't have direct dependency on 'fabric' class constructors if possible to avoid circular deps or bloat.
        // Actually, let's just use the global 'fabric' if available or pass it in? 
        // No, simplest is to let the component handle it? 
        // But Toolbar needs to call this.
        // Let's rely on PDFPage or dynamic import?
        // Or... we just expose `activePageIndex` and `canvasRefs` (already done) 
        // and let Toolbar helper do the heavy lifting?
        // No, Toolbar shouldn't know about Fabric classes.

        // Let's implement a trigger.
        // Or just import fabric here. It's fine.
        import('fabric').then(({ FabricImage }) => {
            return FabricImage.fromURL(dataUrl).then(img => {
                img.scaleToWidth(200);
                // Centre before adding: 'object:added' is what records the history
                // snapshot and centerObject() fires no event of its own, so adding
                // first would record (and later redo) the image at 0,0.
                canvas.centerObject(img);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();
            });
        }).catch(err => {
            console.error("Add image failed:", err);
            alert("That image could not be loaded. Try a PNG or JPEG file.");
        });

    }, [activePageIndex, canvasRefs]);

    // Record the state of a page after a completed action
    const pushHistory = useCallback((pageIndex, canvas) => {
        if (restoringRef.current || !canvas) return;

        const entry = historyRef.current[pageIndex] || (historyRef.current[pageIndex] = { stack: [], index: -1 });
        const json = serializeCanvas(canvas);
        if (entry.index >= 0 && entry.stack[entry.index].json === json) return;

        entry.stack.splice(entry.index + 1); // a new action invalidates the redo tail
        entry.stack.push({ json, width: canvas.width });

        let bytes = entry.stack.reduce((sum, s) => sum + s.json.length, 0);
        while (entry.stack.length > 1 && (entry.stack.length > HISTORY_LIMIT || bytes > HISTORY_BYTES)) {
            bytes -= entry.stack[0].json.length;
            entry.stack.shift();
        }

        entry.index = entry.stack.length - 1;
        setHistoryTick(t => t + 1);
    }, []);

    // Move the active page's history cursor and restore that snapshot
    const applySnapshot = useCallback(async (pageIndex, delta) => {
        const canvas = canvasRefs[pageIndex];
        const entry = historyRef.current[pageIndex];
        if (!canvas || !entry) return;

        const next = entry.index + delta;
        if (next < 0 || next >= entry.stack.length) return;

        const snapshot = entry.stack[next];
        const background = canvas.backgroundImage;
        restoringRef.current = true;
        try {
            await canvas.loadFromJSON(snapshot.json);
            // Snapshots store on-screen coordinates, so re-fit them if the zoom
            // level changed since the snapshot was taken.
            const factor = snapshot.width > 0 ? canvas.width / snapshot.width : 1;
            if (factor !== 1) {
                canvas.getObjects().forEach(obj => {
                    obj.left *= factor;
                    obj.top *= factor;
                    obj.scaleX *= factor;
                    obj.scaleY *= factor;
                    obj.setCoords();
                });
            }
            canvas.backgroundImage = background; // loadFromJSON clears it
            canvas.requestRenderAll();
            entry.index = next;
            setSelectedObjectId(null);
            setHistoryTick(t => t + 1);
        } catch (err) {
            console.error("Undo/redo failed:", err);
        } finally {
            restoringRef.current = false;
        }
    }, [canvasRefs]);

    const undo = useCallback(() => applySnapshot(activePageIndex, -1), [applySnapshot, activePageIndex]);
    const redo = useCallback(() => applySnapshot(activePageIndex, 1), [applySnapshot, activePageIndex]);

    const canUndo = useMemo(() => {
        const entry = historyRef.current[activePageIndex];
        return !!entry && entry.index > 0;
    }, [activePageIndex, historyTick]);

    const canRedo = useMemo(() => {
        const entry = historyRef.current[activePageIndex];
        return !!entry && entry.index < entry.stack.length - 1;
    }, [activePageIndex, historyTick]);

    return (
        <EditorContext.Provider value={{
            activeTool, setActiveTool,
            activeColor, setActiveColor,
            activeStrokeColor, setActiveStrokeColor,
            activeSize, setActiveSize,
            activeStrokeWidth, setActiveStrokeWidth,
            highlightOpacity, setHighlightOpacity,
            scale, setScale,
            activePageIndex, setActivePageIndex,
            pages, setPages,
            canvasRefs, registerCanvas, unregisterCanvas, addImage,
            nearRange, setNearRange,
            undo, redo, canUndo, canRedo, pushHistory,
            isProcessing, setIsProcessing,
            pdfDoc, setPdfDoc,
            selectedObjectId, setSelectedObjectId,
            fileName, setFileName
        }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);
