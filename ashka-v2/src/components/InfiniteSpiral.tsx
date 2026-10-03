import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as Icons from 'lucide-react';

export interface SpiralItem {
  id: string;
  name: string;
  iconName: string;
  image?: string; // Optional picture if used in picture mode
}

interface InfiniteSpiralProps {
  items: SpiralItem[];
  animationMode?: 'all' | 'scroll' | 'drag';
  speed?: number;
  direction?: 'up' | 'down';
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteSpiral: React.FC<InfiniteSpiralProps> = ({
  items,
  animationMode = 'all',
  speed = 0.4,
  direction = 'up',
  radius = 200,
  cardWidth = 220,
  cardHeight = 96,
  verticalSpacing = 70,
  perspective = 1000,
  cardsPerTurn = 7,
  cardRadius = 16,
  centerScale = 1.15,
  edgeFade = 0.3,
  edgeBlur = 3,
  pauseOnHover = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const isHoveredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  const totalItems = items.length;
  const loopHeight = totalItems * verticalSpacing;

  // Animation Loop
  useEffect(() => {
    let currentOffset = 0;
    const dirFactor = direction === 'up' ? 1 : -1;

    const animate = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pauseOnHover || !isHoveredRef.current) {
        currentOffset = (currentOffset + speed * 60 * dt * dirFactor) % loopHeight;
        setOffset(currentOffset);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed, direction, loopHeight, pauseOnHover]);

  // Duplicate items array so the spiral never has gaps
  const renderedItems = useMemo(() => {
    // Generate 3 repetitions to ensure continuous loop
    return [...items, ...items, ...items];
  }, [items]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        if (pauseOnHover) isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isHoveredRef.current = false;
      }}
      className={`relative w-full h-[480px] md:h-[560px] overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center transform-style-3d pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {renderedItems.map((item, index) => {
          const itemPos = (index * verticalSpacing - offset) % loopHeight;
          const normalizedY =
            itemPos < -loopHeight / 2
              ? itemPos + loopHeight
              : itemPos > loopHeight / 2
              ? itemPos - loopHeight
              : itemPos;

          // Helical angle
          const angle = (index / cardsPerTurn) * Math.PI * 2 + (offset / loopHeight) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          // Distance factor for scale and opacity
          const zNorm = (z + radius) / (2 * radius); // 0 (back) to 1 (front)
          const scale = 0.85 + zNorm * (centerScale - 0.85);
          const opacity = 0.35 + zNorm * 0.65;
          const isFront = zNorm > 0.5;

          // Dynamic Icon rendering
          const IconComponent =
            ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string }>>)[item.iconName] ||
            Icons.Sparkles;

          return (
            <div
              key={`${item.id}-${index}`}
              className="absolute pointer-events-auto transition-shadow duration-300"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: `translate3d(${x}px, ${normalizedY}px, ${z}px) rotateY(${(-angle * 180) / Math.PI}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round(zNorm * 100),
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Content card (clean white with charcoal typography matching reference) */}
              <div
                className="w-full h-full p-4 rounded-2xl flex items-center gap-3.5 shadow-[0_12px_30px_-6px_rgba(46,36,33,0.12)] border transition-all backdrop-blur-md"
                style={{
                  borderRadius: `${cardRadius}px`,
                  backgroundColor: '#FFFFFF',
                  color: '#26201E',
                  borderColor: isFront ? '#26201E' : '#E0DAD2',
                  boxShadow: isFront
                    ? '0 16px 36px -8px rgba(46, 36, 33, 0.16)'
                    : '0 4px 14px rgba(46, 36, 33, 0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{
                    backgroundColor: '#26201E',
                    color: '#FFFFFF',
                  }}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug line-clamp-2 text-[#26201E]">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top and Bottom soft fade masks */}
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(234, 230, 225, 0.95) 10%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(234, 230, 225, 0.95) 10%, transparent 100%)',
        }}
      />
    </div>
  );
};
