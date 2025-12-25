import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const EditorContext = createContext();

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

    // Undo/Redo history (simple object stack per page)
    const undoStackRef = useRef({}); // { pageIndex: [objects] }
    const redoStackRef = useRef({}); // { pageIndex: [objects] }

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
            FabricImage.fromURL(dataUrl).then(img => {
                img.scaleToWidth(200);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();
            });
        });

    }, [activePageIndex, canvasRefs]);

    // Undo: Remove last object from active canvas, push to redo stack
    const undo = useCallback(() => {
        const canvas = canvasRefs[activePageIndex];
        if (!canvas) return;

        const objects = canvas.getObjects();
        if (objects.length === 0) return;

        const lastObj = objects[objects.length - 1];
        canvas.remove(lastObj);
        canvas.requestRenderAll();

        // Push to redo stack
        if (!redoStackRef.current[activePageIndex]) {
            redoStackRef.current[activePageIndex] = [];
        }
        redoStackRef.current[activePageIndex].push(lastObj);
    }, [activePageIndex, canvasRefs]);

    // Redo: Restore last removed object from redo stack
    const redo = useCallback(() => {
        const canvas = canvasRefs[activePageIndex];
        if (!canvas) return;

        const pageRedoStack = redoStackRef.current[activePageIndex];
        if (!pageRedoStack || pageRedoStack.length === 0) return;

        const obj = pageRedoStack.pop();
        canvas.add(obj);
        canvas.requestRenderAll();
    }, [activePageIndex, canvasRefs]);

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
            undo, redo,
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
