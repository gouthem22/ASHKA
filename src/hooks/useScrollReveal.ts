import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useScrollReveal(triggerKey?: unknown) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Keep everything visible immediately if reduced motion is requested
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll:not([data-revealed="true"])');
    if (!elements.length) return;

    // Set initial state
    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 24 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.setAttribute('data-revealed', 'true');
            observer.unobserve(target);

            gsap.to(target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: target.dataset.revealDelay ? parseFloat(target.dataset.revealDelay) : 0,
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [triggerKey]);
}
