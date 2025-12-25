import React from 'react';
import { useEditor } from './EditorContext';
import {
    MousePointer2, Type, Pen, Highlighter, Eraser,
    Image as ImageIcon, Square, Circle, Minus, Ban,
    Undo, Redo, ZoomIn, ZoomOut, Download
} from 'lucide-react';

const Toolbar = ({ onDownload }) => {
    const { activeTool, setActiveTool, scale, setScale, isProcessing, addImage, undo, redo } = useEditor();

    const tools = [
        { id: 'select', icon: MousePointer2, label: 'Select' },
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'draw', icon: Pen, label: 'Draw' },
        { id: 'highlight', icon: Highlighter, label: 'Highlight' },
        { id: 'redact', icon: Ban, label: 'Redact' }, // Redact Tool
        { id: 'eraser', icon: Eraser, label: 'Eraser' },
        //{ id: 'image', icon: ImageIcon, label: 'Image' }, // Image upload needs specific handling
        { id: 'rect', icon: Square, label: 'Rectangle' },
        { id: 'circle', icon: Circle, label: 'Circle' },
    ];

    return (
        <div style={{
            height: '60px',
            borderBottom: '1px solid var(--border)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        title={tool.label}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: activeTool === tool.id ? '1px solid var(--primary)' : '1px solid transparent',
                            background: activeTool === tool.id ? 'var(--secondary)' : 'transparent',
                            color: activeTool === tool.id ? 'var(--primary)' : 'var(--foreground)',
                            transition: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <tool.icon size={20} />
                    </button>
                ))}

                <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>

                {/* Image Upload Button Special Case */}
                <label
                    title="Add Image"
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: activeTool === 'image' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeTool === 'image' ? 'var(--secondary)' : 'transparent',
                        color: activeTool === 'image' ? 'var(--primary)' : 'var(--foreground)',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (f) => {
                                    addImage(f.target.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            // Reset input so same file can be selected again
                            e.target.value = '';
                        }}
                    />
                    <ImageIcon size={20} />
                </label>

                <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>

                {/* Undo/Redo Buttons */}
                <button
                    onClick={undo}
                    title="Undo"
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid transparent',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Undo size={20} />
                </button>
                <button
                    onClick={redo}
                    title="Redo"
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid transparent',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Redo size={20} />
                </button>

            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                    onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                    style={{ background: 'none', border: 'none', padding: '0.5rem' }}
                    title="Zoom Out"
                >
                    <ZoomOut size={20} />
                </button>
                <span style={{ minWidth: '3rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={() => setScale(s => Math.min(3.0, s + 0.1))}
                    style={{ background: 'none', border: 'none', padding: '0.5rem' }}
                    title="Zoom In"
                >
                    <ZoomIn size={20} />
                </button>

                <button
                    onClick={onDownload}
                    disabled={isProcessing}
                    className="btn-primary"
                    style={{
                        marginLeft: '1rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: isProcessing ? 0.7 : 1
                    }}
                >
                    {isProcessing ? 'Processing' : <><Download size={16} /> Download</>}
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
