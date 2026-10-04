import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  stagger?: number;
  staggerChildren?: boolean;
  threshold?: number;
  rootMargin?: string;
  ease?: string;
  triggerOnce?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 0.55,
  y = 18,
  x = 0,
  stagger = 0.1,
  staggerChildren = false,
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  ease = 'power3.out',
  triggerOnce = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      if (staggerChildren) {
        gsap.set(el.children, { opacity: 1, x: 0, y: 0 });
      }
      return;
    }

    // Determine target elements: direct children if staggering, otherwise the container itself
    const targets = staggerChildren && el.children.length > 0
      ? Array.from(el.children)
      : [el];

    // Initial hidden state
    gsap.set(targets, {
      opacity: 0,
      y,
      x,
      willChange: 'transform, opacity',
    });

    let animation: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation = gsap.to(targets, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              ease,
              delay,
              stagger: staggerChildren ? stagger : 0,
              overwrite: 'auto',
              onComplete: () => {
                // Release GPU hint after animation
                (targets as Element[]).forEach((t) => {
                  (t as HTMLElement).style.willChange = 'auto';
                });
              },
            });

            if (triggerOnce) {
              observer.unobserve(el);
            }
          } else if (!triggerOnce) {
            // Reset if triggerOnce is false
            gsap.set(targets, { opacity: 0, x, y });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animation) {
        animation.kill();
      }
    };
  }, [delay, duration, y, x, stagger, staggerChildren, threshold, rootMargin, ease, triggerOnce]);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
};
