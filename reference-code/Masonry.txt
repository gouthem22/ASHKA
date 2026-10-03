import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  title?: string;
  height?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
}

export const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MasonryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState(3);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Split items across columns evenly
  const columns = useMemo(() => {
    const cols: MasonryItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols;
  }, [items, columnCount]);

  // Entrance animation with GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.masonry-card');

    let fromVars: gsap.TweenVars = { opacity: 0 };
    if (animateFrom === 'bottom') fromVars.y = 40;
    if (animateFrom === 'top') fromVars.y = -40;
    if (animateFrom === 'left') fromVars.x = -40;
    if (animateFrom === 'right') fromVars.x = 40;

    gsap.fromTo(
      elements,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
      }
    );
  }, [items, columnCount, ease, duration, stagger, animateFrom]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Multi-column grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {columns.map((col, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-6">
            {col.map((item) => {
              const isHovered = hoveredId === item.id;
              const hasHoveredOther = hoveredId !== null && !isHovered;

              return (
                <div
                  key={item.id}
                  className="masonry-card group relative overflow-hidden cursor-pointer transition-all duration-300 rounded-[28px] border border-[#EAB780]/20 bg-[#3A1C24]/60 shadow-xl"
                  style={{
                    transform: isHovered && scaleOnHover ? `scale(${hoverScale})` : 'scale(1)',
                    filter: hasHoveredOther && blurToFocus ? 'blur(2px) opacity(0.7)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedPhoto(item)}
                >
                  <div className="relative w-full overflow-hidden bg-[#2A1419]">
                    <img
                      src={item.img}
                      alt={item.title || 'Hostel facility'}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ minHeight: '220px' }}
                    />
                    {/* Subtle gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Photo title badge */}
                    {item.title && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-medium text-[#FFF4EF] bg-[#2A1419]/80 backdrop-blur-md border border-[#EAB780]/30 shadow-md">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Tap opens the full photo) */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 px-4 py-2 rounded-full text-sm font-semibold text-[#FFF4EF] bg-[#6E2F3B] border border-[#EAB780]/40 shadow-lg hover:bg-[#9E4A57] transition-colors"
              aria-label="Close photo preview"
            >
              Close ✕
            </button>
            <div className="overflow-hidden rounded-3xl border border-[#EAB780]/40 shadow-2xl bg-[#2A1419]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title || 'Ashka Ladies Hostel photo'}
                className="max-h-[80vh] w-auto object-contain"
              />
              {selectedPhoto.title && (
                <div className="p-4 bg-[#2A1419] text-center border-t border-[#EAB780]/20">
                  <p className="font-serif text-lg md:text-xl text-[#FDF4F3]">
                    {selectedPhoto.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
