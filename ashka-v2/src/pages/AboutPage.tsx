import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HOSTEL_DATA } from '../data/hostelData';

interface AboutPageProps {
  onNavigate: (href: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.about-anim-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          '.about-anim-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          '.about-anim-text',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9 },
          '-=0.3'
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full pt-28 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Seamless Editorial Block (No partitions, no boxed divisions) */}
      <article className="space-y-12">
        {/* Header Block */}
        <header className="text-center space-y-4">
          <div className="about-anim-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E0DAD2] text-xs font-semibold uppercase tracking-widest text-[#26201E] shadow-sm">
            <span>Our Heritage & Purpose · Since 2011</span>
          </div>

          <h1 className="about-anim-title font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#26201E] tracking-tight leading-[0.95] uppercase">
            Ashka Ladies Hostel
          </h1>

          <p className="about-anim-title font-serif italic text-2xl sm:text-3xl text-[#7A5B47]">
            "A home away from home in Trichy"
          </p>
        </header>

        {/* Narrative Flow Block */}
        <div ref={narrativeRef} className="space-y-8 text-base sm:text-lg text-[#3D3530] leading-relaxed">
          <p className="about-anim-text first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#26201E] first-letter:mr-2 first-letter:float-left">
            Ashka Ladies Hostel was conceived and built with a solitary, unwavering conviction: to provide college students and working women in Trichy with the same warmth, safety, and attentive consideration they receive from their mothers at home.
          </p>

          <p className="about-anim-text">
            {HOSTEL_DATA.aboutText.welcome}
          </p>

          {/* Elegant Quotation Anchor */}
          <blockquote
            ref={quoteRef}
            className="my-10 py-8 px-6 sm:px-10 border-l-2 border-[#26201E] bg-white/40 rounded-r-3xl backdrop-blur-sm"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-[#26201E] leading-snug mb-3">
              "{HOSTEL_DATA.aboutText.mission}"
            </p>
            <footer className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              — Anu Radha, Proprietor & Warden
            </footer>
          </blockquote>

          <p className="about-anim-text">
            {HOSTEL_DATA.aboutText.reputation} {HOSTEL_DATA.aboutText.value}
          </p>

          <p className="about-anim-text">
            {HOSTEL_DATA.aboutText.pioneer}
          </p>
        </div>

        {/* Seamless Milestones Strip */}
        <div
          ref={statsRef}
          className="pt-10 border-t border-[#E0DAD2] grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E]">2011</span>
            <p className="text-xs uppercase tracking-wider text-[#8C847E]">Pioneering Year</p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E]">15</span>
            <p className="text-xs uppercase tracking-wider text-[#8C847E]">Boutique Rooms</p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E]">3x</span>
            <p className="text-xs uppercase tracking-wider text-[#8C847E]">Homely Meals Daily</p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E]">24/7</span>
            <p className="text-xs uppercase tracking-wider text-[#8C847E]">Water & Security</p>
          </div>
        </div>

        {/* Closing Invitation */}
        <div className="pt-6 text-center">
          <p className="font-serif italic text-lg text-[#7A5B47] mb-6">
            {HOSTEL_DATA.aboutText.goal}
          </p>
          <a
            href={HOSTEL_DATA.links.enquiryWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="ranty-btn shadow-md"
          >
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </article>
    </div>
  );
};
