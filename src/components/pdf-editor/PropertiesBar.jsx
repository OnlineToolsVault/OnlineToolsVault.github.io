import React from 'react';
import { useEditor } from './EditorContext';

const toolInfo = {
    select: { name: 'Select', desc: 'Click to select and move objects.' },
    text: { name: 'Text', desc: 'Click to add editable text.' },
    draw: { name: 'Draw', desc: 'Freehand drawing with brush.' },
    highlight: { name: 'Highlight', desc: 'Semi-transparent highlight marker.' },
    redact: { name: 'Redact', desc: 'Black box to permanently hide text. Page will be flattened on save.' },
    eraser: { name: 'Eraser', desc: 'White brush to erase content.' },
    rect: { name: 'Rectangle', desc: 'Click to add a rectangle shape.' },
    circle: { name: 'Circle', desc: 'Click to add a circle shape.' },
};

const PropertiesBar = () => {
    const {
        activeTool,
        activeColor, setActiveColor,
        activeStrokeColor, setActiveStrokeColor,
        activeSize, setActiveSize,
        activeStrokeWidth, setActiveStrokeWidth,
        selectedObjectId
    } = useEditor();

    const isText = (activeTool === 'text') || (selectedObjectId && (selectedObjectId.type === 'i-text' || selectedObjectId.type === 'text'));
    const isShape = ['rect', 'circle', 'path', 'redact'].includes(activeTool) || (selectedObjectId && ['rect', 'circle', 'path'].includes(selectedObjectId.type));
    /* Note: 'redact' objects are just rects but usually we don't want to change their color from black, but user might want to. Let's allow it. */

    // Show Property Groups
    const showTextFormat = isText;
    const showFillColor = isText || isShape; // For Shapes, 'activeColor' is Fill
    const showStrokeColor = isShape;        // For Shapes, 'activeStrokeColor' is Border
    const showFontSize = isText;
    const showStrokeWidth = isShape;        // For Shapes, 'activeStrokeWidth' is Border Size

    const [isBold, setIsBold] = React.useState(false);
    const [isItalic, setIsItalic] = React.useState(false);
    const [isUnderline, setIsUnderline] = React.useState(false);
    const [isLinethrough, setIsLinethrough] = React.useState(false);

    // Sync state with selection
    React.useEffect(() => {
        if (selectedObjectId) {
            // Text Properties
            if (selectedObjectId.type === 'i-text' || selectedObjectId.type === 'text') {
                setActiveColor(selectedObjectId.fill);
                setActiveSize(selectedObjectId.fontSize);
                setIsBold(selectedObjectId.fontWeight === 'bold');
                setIsItalic(selectedObjectId.fontStyle === 'italic');
                setIsUnderline(selectedObjectId.underline);
                setIsLinethrough(selectedObjectId.linethrough);
            }
            // Shape Properties
            else if (['rect', 'circle', 'path'].includes(selectedObjectId.type)) {
                setActiveColor(selectedObjectId.fill);
                setActiveStrokeColor(selectedObjectId.stroke || '#000000');
                setActiveStrokeWidth(selectedObjectId.strokeWidth || 2);
            }
        }
    }, [selectedObjectId, setActiveColor, setActiveSize, setActiveStrokeColor, setActiveStrokeWidth]);

    const toggleProperty = (prop, value) => {
        if (selectedObjectId && (selectedObjectId.type === 'i-text' || selectedObjectId.type === 'text')) {
            const current = selectedObjectId[prop];
            const next = current === value ? 'normal' : value;

            // Boolean toggles need different handling
            if (prop === 'underline' || prop === 'linethrough') {
                selectedObjectId.set(prop, !current);
                if (prop === 'underline') setIsUnderline(!current);
                if (prop === 'linethrough') setIsLinethrough(!current);
            } else {
                selectedObjectId.set(prop, next);
                if (prop === 'fontWeight') setIsBold(next === 'bold');
                if (prop === 'fontStyle') setIsItalic(next === 'italic');
            }
            selectedObjectId.canvas.requestRenderAll();
        }
    };

    const handleFillColorChange = (color) => {
        setActiveColor(color);
        if (selectedObjectId) {
            selectedObjectId.set('fill', color);
            selectedObjectId.canvas.requestRenderAll();
        }
    };

    const handleStrokeColorChange = (color) => {
        setActiveStrokeColor(color);
        if (selectedObjectId) {
            selectedObjectId.set('stroke', color);
            selectedObjectId.canvas.requestRenderAll();
        }
    };

    const handleFontSizeChange = (size) => {
        setActiveSize(size);
        if (selectedObjectId && (selectedObjectId.type === 'i-text' || selectedObjectId.type === 'text')) {
            selectedObjectId.set('fontSize', size);
            selectedObjectId.canvas.requestRenderAll();
        }
    };

    const handleStrokeWidthChange = (width) => {
        setActiveStrokeWidth(width);
        if (selectedObjectId) {
            selectedObjectId.set('strokeWidth', width);
            selectedObjectId.canvas.requestRenderAll();
        }
    };

    if (!showTextFormat && !showFillColor && !showStrokeColor) return null;

    return (
        <div style={{
            width: '250px',
            borderLeft: '1px solid var(--border)',
            background: 'white',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            height: '100%',
            overflowY: 'auto',
            boxSizing: 'border-box'
        }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Properties</h3>

            {/* TOOL INFO */}
            {activeTool && (
                <div style={{
                    padding: '0.75rem',
                    background: '#f1f5f9',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem'
                }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#334155' }}>
                        {toolInfo[activeTool]?.name || activeTool}
                    </div>
                    <div style={{ color: '#64748b' }}>
                        {toolInfo[activeTool]?.desc || 'Select a tool to see its description.'}
                    </div>
                </div>
            )}

            {/* TEXT FORMATTING */}
            {showTextFormat && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>Format</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => toggleProperty('fontWeight', 'bold')} style={btnStyle(isBold, 'bold')}>B</button>
                        <button onClick={() => toggleProperty('fontStyle', 'italic')} style={btnStyle(isItalic, 'normal', 'italic')}>I</button>
                        <button onClick={() => toggleProperty('underline', true)} style={btnStyle(isUnderline, 'normal', 'normal', 'underline')}>U</button>
                        <button onClick={() => toggleProperty('linethrough', true)} style={btnStyle(isLinethrough, 'normal', 'normal', 'line-through')}>S</button>
                    </div>
                </div>
            )}

            {/* FILL COLOR (Text or Shape Fill) */}
            {showFillColor && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                        {isText ? 'Text Color' : 'Fill Color'}
                    </label>
                    <ColorPicker color={activeColor} onChange={handleFillColorChange} />
                </div>
            )}

            {/* STROKE COLOR (Shape Border) */}
            {showStrokeColor && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>Border Color</label>
                    <ColorPicker color={activeStrokeColor} onChange={handleStrokeColorChange} />
                </div>
            )}

            {/* FONT SIZE */}
            {showFontSize && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>Font Size</label>
                    <Slider value={activeSize} min={8} max={72} onChange={handleFontSizeChange} unit="px" />
                </div>
            )}

            {/* STROKE WIDTH */}
            {showStrokeWidth && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>Border Width</label>
                    <Slider value={activeStrokeWidth} min={0} max={20} onChange={handleStrokeWidthChange} unit="px" />
                </div>
            )}

            {/* REDACTION WARNING */}
            {activeTool === 'redact' && (
                <div style={{
                    padding: '1rem',
                    background: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    color: '#92400e'
                }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Secure Redaction</p>
                    <p>Pages with redaction boxes will be <strong>flattened to images</strong> when saved.</p>
                    <p style={{ marginTop: '0.5rem' }}>This ensures the underlying text is permanently removed and cannot be copied.</p>
                </div>
            )}

            <div style={{ marginTop: 'auto', padding: '1rem', background: '#f1f5f9', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                <p><strong>Tip:</strong> Select an object to edit it.</p>
                <p style={{ marginTop: '0.5rem' }}>Use the Delete key to remove selected items.</p>
            </div>
        </div>
    );
};

// Sub-components for cleaner code
const btnStyle = (active, fw = 'normal', fs = 'normal', dec = 'none') => ({
    padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0',
    background: active ? '#e2e8f0' : 'white', cursor: 'pointer',
    fontWeight: fw, fontStyle: fs, textDecoration: dec, minWidth: '32px'
});

const ColorPicker = ({ color, onChange }) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['transparent', '#000000', '#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7'].map(c => (
            <div
                key={c}
                onClick={() => onChange(c)}
                style={{
                    width: '24px', height: '24px', borderRadius: '50%', background: c === 'transparent' ?
                        'conic-gradient(#ccc 90deg, #fff 90deg 180deg, #ccc 180deg 270deg, #fff 270deg)' : c,
                    cursor: 'pointer',
                    border: color === c ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                }}
                title={c}
            />
        ))}
        <input
            type="color"
            value={color === 'transparent' ? '#ffffff' : color}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '24px', height: '24px', padding: 0, border: 'none', background: 'none' }}
        />
    </div>
);

const Slider = ({ value, min, max, onChange, unit }) => (
    <div>
        <input
            type="range"
            min={min} max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            style={{ width: '100%' }}
        />
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            {value}{unit}
        </div>
    </div>
);

export default PropertiesBar;
