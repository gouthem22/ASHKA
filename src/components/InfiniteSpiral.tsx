import React, { useEffect, useRef, useMemo } from 'react';
import {
  Utensils,
  Droplets,
  Shield,
  Sun,
  Wind,
  Layers,
  Coffee,
  Zap,
  Home,
  Star,
  Sparkles,
  Clock,
  Lock,
  Camera,
  Tv,
  BookOpen,
  Shirt,
  Dumbbell,
  Heart,
  MapPin,
  Phone,
  ChevronUp,
  Flame,
  Truck,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Static icon map – avoids importing entire lucide bundle at runtime
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Utensils, Droplets, Shield, Sun, Wind, Layers, Coffee, Zap,
  Home, Star, Sparkles, Clock, Lock, Camera, Tv, BookOpen, Shirt,
  Dumbbell, Heart, MapPin, Phone, ChevronUp, Flame, Truck,
};

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
  // Store card DOM refs for direct mutation – bypasses React re-render
  const cardRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());
  const isHoveredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const offsetRef = useRef(0);

  const totalItems = items.length;
  const loopHeight = totalItems * verticalSpacing;

  // Duplicate items array so the spiral never has gaps
  const renderedItems = useMemo(() => {
    return [...items, ...items, ...items];
  }, [items]);

  // Animation Loop — mutates DOM directly, zero React re-renders
  useEffect(() => {
    const dirFactor = direction === 'up' ? 1 : -1;

    const animate = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // cap dt to 50ms
      lastTimeRef.current = time;

      if (!pauseOnHover || !isHoveredRef.current) {
        offsetRef.current = (offsetRef.current + speed * 60 * dt * dirFactor) % loopHeight;
      }

      const currentOffset = offsetRef.current;

      // Directly mutate each card's transform & opacity – no setState
      cardRefsMap.current.forEach((el, index) => {
        if (!el) return;
        const itemPos = (index * verticalSpacing - currentOffset) % loopHeight;
        const normalizedY =
          itemPos < -loopHeight / 2
            ? itemPos + loopHeight
            : itemPos > loopHeight / 2
            ? itemPos - loopHeight
            : itemPos;

        const angle =
          (index / cardsPerTurn) * Math.PI * 2 +
          (currentOffset / loopHeight) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const zNorm = (z + radius) / (2 * radius);
        const scale = 0.85 + zNorm * (centerScale - 0.85);
        const opacity = 0.35 + zNorm * 0.65;

        el.style.transform = `translate3d(${x}px, ${normalizedY}px, ${z}px) rotateY(${(-angle * 180) / Math.PI}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(zNorm * 100));
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed, direction, loopHeight, pauseOnHover, cardsPerTurn, radius, centerScale, verticalSpacing]);

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
          const IconComponent = ICON_MAP[item.iconName] ?? Sparkles;

          return (
            <div
              key={`${item.id}-${index}`}
              ref={(el) => {
                if (el) cardRefsMap.current.set(index, el);
                else cardRefsMap.current.delete(index);
              }}
              className="absolute pointer-events-auto"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                // Initial hidden transform — RAF will override immediately
                transform: 'translate3d(-9999px, 0, 0)',
                opacity: 0,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              {/* Content card */}
              <div
                className="w-full h-full p-4 flex items-center gap-3.5 border bg-white text-[#26201E]"
                style={{
                  borderRadius: `${cardRadius}px`,
                  borderColor: '#E0DAD2',
                  boxShadow: '0 4px 14px rgba(46,36,33,0.08)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#26201E' }}
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
