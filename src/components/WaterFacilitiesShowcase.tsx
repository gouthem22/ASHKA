import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Flame, ShieldCheck, Waves, Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';

interface WaterFacilityItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  specs: string[];
}

const WATER_FACILITIES: WaterFacilityItem[] = [
  {
    id: 'ro-purifier',
    title: 'Commercial RO Water Purifier',
    badge: 'Multi-Stage Pure Drinking Water',
    subtitle: 'High-capacity Reverse Osmosis filtration unit on premises',
    description: 'Safe, clean, and sweet drinking water processed through multi-stage industrial RO filtration. Available 24 hours a day for all students and residents without restriction.',
    icon: ShieldCheck,
    image: '/images/gallery/11.png',
    specs: ['Continuous UV + RO filtration', 'Regular TDS & purity monitoring', 'Hygienic stainless steel dispensary'],
  },
  {
    id: 'hot-cold-water',
    title: '24-Hour Hot & Cold Water',
    badge: 'Uninterrupted Supply',
    subtitle: 'Round-the-clock water lines across all rooms & washrooms',
    description: 'Reliable high-pressure water supply operating day and night. Backed by extensive storage tanks so residents never experience water shortages during study or working hours.',
    icon: Droplets,
    image: '/images/ai/hot-cold-water.jpg',
    specs: ['24/7 continuous overhead storage', 'Dual hot & cold pipeline lines', 'High-pressure bathroom fittings'],
  },
  {
    id: 'water-heater',
    title: 'Instant Water Heaters',
    badge: 'Thermostat Controlled',
    subtitle: 'Geysers for early morning and evening hot showers',
    description: 'Equipped with rapid water heating systems ensuring soothing warm water during early college mornings, chilly weather, and night routines.',
    icon: Flame,
    image: '/images/ai/water-heater.jpg',
    specs: ['Fast thermostat warming', 'Safety cut-off protection', 'Dedicated power backup'],
  },
  {
    id: 'wash-laundry',
    title: 'Clothes-Wash & Laundry Area',
    badge: 'Dedicated Facility',
    subtitle: 'Spacious washing bays with continuous running water',
    description: 'Designated hygienic washing slabs, deep sinks, and ample drying lines specifically laid out for everyday washing and laundry convenience.',
    icon: Waves,
    image: '/images/ai/laundry-area.jpg',
    specs: ['Abundant running tap water', 'Well-ventilated clothes drying area', 'Regular housekeeping sanitization'],
  },
];

export const WaterFacilitiesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const waveRef1 = useRef<SVGPathElement>(null);
  const waveRef2 = useRef<SVGPathElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  // GSAP animated fluid wave simulation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const wave1 = waveRef1.current;
    const wave2 = waveRef2.current;

    if (wave1 && wave2) {
      gsap.to(wave1, {
        x: -200,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(wave2, {
        x: -160,
        duration: 6,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  // Animate content transition on tab switch
  useEffect(() => {
    if (cardContentRef.current) {
      gsap.fromTo(
        cardContentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const current = WATER_FACILITIES[activeTab];
  const CurrentIcon = current.icon;

  return (
    <div className="relative rounded-[36px] overflow-hidden border border-[#E0DAD2] bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(46,36,33,0.07)] mb-16">
      {/* Dynamic Animated Fluid Waves Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg
          className="absolute -bottom-6 left-0 w-[1400px] h-32"
          viewBox="0 0 1400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={waveRef1}
            d="M0 60 Q 150 20, 300 60 T 600 60 T 900 60 T 1200 60 T 1500 60 L 1500 120 L 0 120 Z"
            fill="#EAE6E1"
          />
          <path
            ref={waveRef2}
            d="M0 75 Q 180 35, 360 75 T 720 75 T 1080 75 T 1440 75 L 1440 120 L 0 120 Z"
            fill="#DCD6CE"
          />
        </svg>
      </div>

      {/* Top Banner Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#EAE6E1]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] text-xs font-semibold uppercase tracking-wider text-[#26201E] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#26201E]" />
            <span>Water & Hygiene Infrastructure</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] tracking-tight">
            24-Hour Water & Purification Systems
          </h3>
          <p className="text-sm sm:text-base text-[#6E6660] mt-1 max-w-xl">
            Tested, reliable, and uninterrupted. Pure water and instant heating are maintained daily for every resident.
          </p>
        </div>

        {/* Live Active Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#D4CDC4] self-start md:self-auto shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26201E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#26201E]" />
          </span>
          <span className="text-xs font-semibold tracking-wider text-[#26201E] uppercase">
            24/7 Active Supply
          </span>
        </div>
      </div>

      {/* Interactive Water Facility Tabs */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {WATER_FACILITIES.map((item, idx) => {
          const ItemIcon = item.icon;
          const isActive = idx === activeTab;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? 'bg-[#26201E] text-white border-[#26201E] shadow-md scale-[1.02]'
                  : 'bg-[#F4EFEB] text-[#26201E] border-[#E0DAD2] hover:bg-white hover:border-[#D4CDC4]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white text-[#26201E]'
                      : 'bg-white text-[#26201E] border border-[#E0DAD2]'
                  }`}
                >
                  <ItemIcon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-mono ${isActive ? 'text-white/70' : 'text-[#8C847E]'}`}>
                  0{idx + 1}
                </span>
              </div>
              <p className={`text-sm font-semibold leading-snug line-clamp-1 ${isActive ? 'text-white' : 'text-[#26201E]'}`}>
                {item.title}
              </p>
              <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-white/75' : 'text-[#6E6660]'}`}>
                {item.badge}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Facility Spotlight Showcase with Real Photo & Specs */}
      <div
        ref={cardContentRef}
        className="relative z-10 rounded-2xl overflow-hidden bg-[#FAF7F3] border border-[#E0DAD2] p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E0DAD2] shadow-sm bg-[#EAE6E1]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#26201E] shadow-sm">
                  {current.badge}
                </span>
                <span className="text-[11px] text-[#26201E] font-mono bg-white/90 px-2 py-0.5 rounded-md">
                  Ashka Facilities
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Impact & Guarantee */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C847E] font-semibold mb-1">
                <CurrentIcon className="w-4 h-4 text-[#26201E]" />
                <span>{current.badge}</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#26201E]">
                {current.title}
              </h4>
              <p className="text-sm font-medium text-[#7A5B47] mt-0.5">
                {current.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#5C544F] leading-relaxed">
              {current.description}
            </p>

            {/* Checklist of Features */}
            <div className="pt-3 border-t border-[#EAE6E1] space-y-2">
              {current.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0" />
                  <span className="text-sm text-[#26201E] font-medium">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
