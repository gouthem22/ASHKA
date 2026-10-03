import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: NavItem[];
  activeHref: string;
  onNavigate: (href: string) => void;
  logoSrc?: string;
  baseColor?: string;
  pillColor?: string;
  pillTextColor?: string;
  hoveredPillTextColor?: string;
  ease?: string;
  initialLoadAnimation?: boolean;
}

export const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  onNavigate,
  logoSrc = '/logo/ashka-logo.png',
  ease = 'power3.easeOut',
  initialLoadAnimation = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  // Position the sliding background pill on active/hovered item
  useEffect(() => {
    if (!navListRef.current || !pillRef.current) return;
    const targetHref = hoveredHref || activeHref;
    const activeItem = navListRef.current.querySelector(
      `[data-href="${targetHref}"]`
    ) as HTMLElement;

    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      gsap.to(pillRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        opacity: 1,
        duration: 0.35,
        ease: ease,
      });
    } else {
      gsap.to(pillRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [activeHref, hoveredHref, ease]);

  // Initial load animation
  useEffect(() => {
    if (initialLoadAnimation && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [initialLoadAnimation]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={containerRef}
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center justify-between gap-3 md:gap-5 p-1.5 md:p-2 pl-3 md:pl-4 pr-2 md:pr-3 rounded-full shadow-[0_12px_36px_-10px_rgba(46,36,33,0.12)] transition-all backdrop-blur-xl bg-white/90 border border-[#E0DAD2]"
      >
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 group focus:outline-none"
          title="Ashka Ladies Hostel - Home"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-[#26201E] border border-[#26201E] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src={logoSrc}
              alt="Ashka Ladies Hostel Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span className="font-serif font-bold text-lg md:text-xl text-[#26201E] tracking-tight uppercase">
            Ashka
          </span>
        </a>

        {/* Desktop Links Container */}
        <div className="relative hidden md:block">
          <ul
            ref={navListRef}
            className="relative flex items-center gap-1 z-10 list-none m-0 p-0"
          >
            {/* Sliding Pill Indicator */}
            <div
              ref={pillRef}
              className="absolute top-1 bottom-1 rounded-full pointer-events-none transition-opacity bg-[#26201E] shadow-sm"
              style={{
                zIndex: 0,
                opacity: 0,
              }}
            />

            {items.map((item) => {
              const isActive = activeHref === item.href;
              const isHovered = hoveredHref === item.href;

              return (
                <li
                  key={item.href}
                  data-href={item.href}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  onMouseLeave={() => setHoveredHref(null)}
                  className="relative z-10"
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="block px-4 py-2 text-xs md:text-sm font-medium transition-colors duration-200 rounded-full select-none whitespace-nowrap"
                    style={{
                      color: isActive
                        ? '#FFFFFF'
                        : isHovered
                        ? '#26201E'
                        : '#5C544F',
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* SPECIFIC DEDICATED SEPARATED CONTAINER FOR "CONTACT US" (With exact typography & interactive underline animation) */}
        <div className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white/85 border border-[#E0DAD2] shadow-[0_2px_8px_rgba(46,36,33,0.04)] hover:bg-white hover:border-[#26201E]/40 transition-all duration-300">
          {/* CONTACT US link with exact bold typography and animated bottom underline line */}
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="group relative inline-flex flex-col items-center justify-center focus:outline-none"
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                activeHref === '/contact'
                  ? 'text-[#26201E]'
                  : 'text-[#26201E] group-hover:text-[#7A5B47]'
              }`}
            >
              CONTACT US
            </span>
            
            {/* Animated Solid Underline */}
            <span
              className={`h-[2px] w-full bg-[#26201E] mt-0.5 rounded-full transition-all duration-300 ${
                activeHref === '/contact'
                  ? 'opacity-100 scale-x-100'
                  : 'opacity-85 scale-x-95 group-hover:scale-x-105 group-hover:opacity-100 group-hover:bg-[#7A5B47]'
              }`}
              style={{ transformOrigin: 'center' }}
            />
          </a>
        </div>

        {/* Mobile Round Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1 focus:outline-none transition-transform active:scale-95 bg-white border border-[#E0DAD2] shadow-sm"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-4 h-0.5 bg-[#26201E] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#26201E] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#26201E] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm md:hidden pointer-events-auto">
          <div className="absolute top-20 left-4 right-4 bg-white/95 rounded-3xl p-6 border border-[#E0DAD2] shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0DAD2]">
              <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
                Navigation
              </span>
            </div>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`py-2 px-3 rounded-xl text-base font-medium transition-colors ${
                  activeHref === item.href
                    ? 'bg-[#26201E] text-white font-semibold'
                    : 'text-[#26201E] hover:bg-[#F4EFEB]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E0DAD2]">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="w-full text-center ranty-btn flex items-center justify-center gap-2"
              >
                <span>CONTACT US</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
