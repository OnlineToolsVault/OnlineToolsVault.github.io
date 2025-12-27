import React, { useState } from 'react';
import { useEditor } from './EditorContext';
import {
    MousePointer2, Type, Pen, Highlighter, Eraser,
    Image as ImageIcon, Square, Circle, Ban,
    Undo, Redo, ZoomIn, ZoomOut, Download, ChevronDown
} from 'lucide-react';

const ToolGroup = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', paddingRight: '0.75rem', marginRight: '0.75rem', borderRight: '1px solid var(--border)' }}>
        {children}
    </div>
);

const ToolButton = ({ id, icon: Icon, label, active, onClick, disabled }) => {
    const [hover, setHover] = useState(false);

    return (
        <div style={{ position: 'relative' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <button
                onClick={onClick}
                disabled={disabled}
                style={{
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: active ? 'var(--primary-light)' : (hover ? 'var(--secondary)' : 'transparent'),
                    color: active ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    opacity: disabled ? 0.5 : 1
                }}
                aria-label={label}
            >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            </button>
            {hover && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1e293b',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    pointerEvents: 'none'
                }}>
                    {label}
                </div>
            )}
        </div>
    );
};

const Toolbar = ({ onDownload }) => {
    const { activeTool, setActiveTool, scale, setScale, isProcessing, addImage, undo, redo } = useEditor();

    const canUndo = true; // Context doesn't expose stack size yet
    const canRedo = true;

    return (
        <div style={{
            height: '70px',
            background: 'white',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            {/* Left: Tools */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ToolGroup>
                    <ToolButton id="select" icon={MousePointer2} label="Select" active={activeTool === 'select'} onClick={() => setActiveTool('select')} />
                </ToolGroup>

                <ToolGroup>
                    <ToolButton id="text" icon={Type} label="Add Text" active={activeTool === 'text'} onClick={() => setActiveTool('text')} />
                    <ToolButton id="draw" icon={Pen} label="Freehand Draw" active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} />
                    <ToolButton id="highlight" icon={Highlighter} label="Highlight" active={activeTool === 'highlight'} onClick={() => setActiveTool('highlight')} />
                </ToolGroup>

                <ToolGroup>
                    <ToolButton id="rect" icon={Square} label="Rectangle" active={activeTool === 'rect'} onClick={() => setActiveTool('rect')} />
                    <ToolButton id="circle" icon={Circle} label="Circle" active={activeTool === 'circle'} onClick={() => setActiveTool('circle')} />
                    <ToolButton id="redact" icon={Ban} label="Redact & Erase" active={activeTool === 'redact'} onClick={() => setActiveTool('redact')} />

                    {/* Image Upload */}
                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ToolButton id="image" icon={ImageIcon} label="Add Image" active={false} onClick={() => { }} />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (f) => addImage(f.target.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </ToolGroup>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <ToolButton id="undo" icon={Undo} label="Undo" onClick={undo} disabled={!canUndo} />
                    <ToolButton id="redo" icon={Redo} label="Redo" onClick={redo} disabled={!canRedo} />
                </div>
            </div>

            {/* Right: Zoom & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--secondary)', borderRadius: '0.5rem', padding: '0.25rem' }}>
                    <button
                        onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                        style={{ padding: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                        <ZoomOut size={16} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', minWidth: '3.5rem', textAlign: 'center', color: 'var(--foreground)' }}>
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={() => setScale(s => Math.min(3.0, s + 0.1))}
                        style={{ padding: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                        <ZoomIn size={16} />
                    </button>
                </div>

                <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>

                <button
                    onClick={onDownload}
                    disabled={isProcessing}
                    style={{
                        background: 'linear-gradient(135deg, var(--primary), #818cf8)',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        opacity: isProcessing ? 0.8 : 1,
                        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                    }}
                >
                    {isProcessing ? (
                        <>Processing...</>
                    ) : (
                        <>
                            <Download size={18} />
                            Download PDF
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
