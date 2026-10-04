import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

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
  hoverScale = 0.98,
  blurToFocus = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MasonryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState(3);

  // Close preview on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

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

  // Entrance animation with GSAP — fires once on mount only
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

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
                  className="masonry-card group relative overflow-hidden cursor-pointer rounded-[28px] border border-[#E0DAD2] bg-white shadow-[0_12px_36px_-10px_rgba(46,36,33,0.08)] transition-all duration-300 hover:shadow-xl"
                  style={{
                    transform: isHovered && scaleOnHover ? `scale(${hoverScale})` : 'scale(1)',
                    filter: hasHoveredOther && blurToFocus ? 'opacity(0.85)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedPhoto(item)}
                >
                  <div className="relative w-full overflow-hidden bg-[#EAE6E1]">
                    <img
                      src={item.img}
                      alt={item.title || 'Hostel facility'}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ minHeight: '220px' }}
                    />
                    {/* Subtle gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Photo title badge */}
                    {item.title && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#26201E] bg-white/95 border border-[#E0DAD2] shadow-sm">
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

      {/* Clean Image-Only Preview (No heavy dark backgrounds or enclosing boxes) */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Round Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 sm:-right-4 w-9 h-9 rounded-full bg-white/95 text-[#26201E] border border-[#E0DAD2] shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
              aria-label="Close photo preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Pure Image Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title || 'Ashka Ladies Hostel photo'}
                className="max-h-[82vh] w-auto max-w-[92vw] sm:max-w-[85vw] object-contain block"
              />

              {/* Minimal Clean Caption Overlay */}
              {selectedPhoto.title && (
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-center pointer-events-none">
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium text-[#26201E] bg-white/95 backdrop-blur-md shadow-md border border-[#E0DAD2]/80">
                    {selectedPhoto.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
