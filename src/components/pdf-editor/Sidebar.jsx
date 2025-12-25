import React, { useEffect, useRef, memo, useState } from 'react';
import { useEditor } from './EditorContext';

const Thumbnail = memo(({ page, pageIndex, scrollToPage, shouldRender, onComplete, isActive }) => {
    const canvasRef = useRef(null);
    const hasRendered = useRef(false);
    const lastPageRef = useRef(null);

    useEffect(() => {
        // Reset when page object changes (new PDF loaded)
        if (page !== lastPageRef.current) {
            hasRendered.current = false;
            lastPageRef.current = page;
        }

        if (!shouldRender || hasRendered.current || !page || !canvasRef.current) return;

        let active = true;

        const renderDirectly = async () => {
            try {
                const viewport = page.getViewport({ scale: 0.3 }); // 0.3 scale for sidebar (approx 200px wide)
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                // Clear previous content
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                context.clearRect(0, 0, canvas.width, canvas.height);

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;

                if (active) {
                    hasRendered.current = true;
                }
            } catch (error) {
                console.error(`Error rendering thumbnail ${pageIndex}:`, error);
            } finally {
                if (active) {
                    onComplete(pageIndex);
                }
            }
        };

        renderDirectly();

        return () => { active = false; };
    }, [shouldRender, page, pageIndex, onComplete]);

    return (
        <div
            onClick={() => scrollToPage(pageIndex)}
            style={{
                cursor: 'pointer',
                marginBottom: '1.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div style={{
                transition: 'all 0.2s ease-in-out',
                border: isActive ? '2px solid #3b82f6' : '1px solid transparent', // Blue border if active
                borderRadius: '4px',
                padding: '4px', // Gap for border
                background: isActive ? '#eff6ff' : 'transparent',
                boxShadow: isActive ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none',
                marginBottom: '0.5rem'
            }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        maxWidth: '180px', // Limit max width
                        display: 'block',
                        background: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                    }}
                />
            </div>

            <div style={{
                textAlign: 'center',
                fontSize: '0.8rem',
                color: isActive ? '#3b82f6' : '#64748b',
                fontWeight: isActive ? '700' : '500',
                transition: 'color 0.2s'
            }}>
                {pageIndex + 1}
            </div>
        </div>
    );
});

const Sidebar = () => {
    const { pages, fileName, activePageIndex } = useEditor();
    const [renderTargetIndex, setRenderTargetIndex] = useState(0);

    // Reset when document changes
    useEffect(() => {
        setRenderTargetIndex(0);
    }, [pages, fileName]);

    const handleThumbnailComplete = (doneIndex) => {
        // Advance to next index
        setRenderTargetIndex(prev => Math.max(prev, doneIndex + 1));
    };

    const scrollToPage = (pageIndex) => {
        const el = document.getElementById(`pdf-page-${pageIndex}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{
            width: '240px',
            borderRight: '1px solid var(--border)',
            background: '#f8fafc',
            overflowY: 'auto',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 60px)',
            flexShrink: 0
        }}>

            {pages.map((page, index) => (
                <Thumbnail
                    key={index}
                    page={page}
                    pageIndex={index}
                    scrollToPage={scrollToPage}
                    shouldRender={index <= renderTargetIndex}
                    onComplete={handleThumbnailComplete}
                    isActive={index === activePageIndex}
                />
            ))}

            {pages.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '2rem' }}>
                    No pages
                </div>
            )}
        </div>
    );
};

export default Sidebar;
