import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrollProgressProps {
  currentPath?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ currentPath }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    // Reset indicator position upon page/route changes
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

      gsap.to(bar, {
        scaleX: progress,
        duration: 0.12,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPath]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={progressBarRef}
        className="w-full h-full bg-[#26201E]"
        style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
      />
    </div>
  );
};
