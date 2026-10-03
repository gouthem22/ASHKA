import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  HeartHandshake,
  ShieldCheck,
  Utensils,
  BookOpen,
  Droplets,
  Sparkles,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Quote,
  Users,
  Compass,
  Building2,
  Sun,
  Shield,
  Star
} from 'lucide-react';
import { HOSTEL_DATA } from '../data/hostelData';
import { Reveal } from '../components/Reveal';

interface AboutPageProps {
  onNavigate: (href: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const [activeStoryTab, setActiveStoryTab] = useState<'mission' | 'heritage' | 'promise'>('mission');
  const [activeTimelineYear, setActiveTimelineYear] = useState<number>(2011);

  // GSAP Orchestrated Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroBadgeRef.current,
        { opacity: 0, y: -25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.about-hero-title',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          '-=0.5'
        )
        .fromTo(
          '.about-hero-media',
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          '.about-stat-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Milestones Timeline Data
  const milestones = [
    {
      year: 2011,
      title: 'The Inception Above SBI Bank',
      desc: 'Founded with a heartfelt mission: giving female students and working professionals traveling to Trichy the tender care, safety, and delicious home-cooked meals of their own mother.',
      tag: 'Foundation',
      icon: <Building2 className="w-5 h-5 text-[#26201E]" />
    },
    {
      year: 2015,
      title: 'Expansion to 15 Boutique Rooms',
      desc: 'Upgraded infrastructure to 15 spacious, well-ventilated Non-AC rooms with attached and common washrooms, industrial RO drinking water plant, and solar geysers.',
      tag: 'Infrastructure',
      icon: <Sparkles className="w-5 h-5 text-[#26201E]" />
    },
    {
      year: 2020,
      title: 'Digital & 24/7 Security Grid',
      desc: 'Implemented round-the-clock CCTV surveillance, high-speed fiber-optic Wi-Fi, modern rooftop dining veranda, and a quiet dedicated reading and study hall.',
      tag: 'Safety & Tech',
      icon: <ShieldCheck className="w-5 h-5 text-[#26201E]" />
    },
    {
      year: 2026,
      title: '15 Years of Maternal Trust',
      desc: 'Cherished as Trichy’s premier boutique ladies residence with over 500+ student and career alumni from leading universities, IT hubs, and corporate institutions.',
      tag: 'Milestone',
      icon: <Award className="w-5 h-5 text-[#26201E]" />
    },
  ];

  // Core Value Pillars
  const pillars = [
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#26201E]" />,
      title: 'Motherly Attention & Care',
      desc: 'Managed directly on-site by proprietor Anu Radha. Every resident’s health, comfort, daily needs, and emotional well-being receive personal, motherly consideration.',
      badge: 'Personalized Care',
      accent: 'bg-[#F4EFEB]'
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#26201E]" />,
      title: '3 Fresh Homely Meals Daily',
      desc: 'Nutritious, authentic South Indian vegetarian meals prepared three times daily in a spotless, hygienic kitchen—just like home with zero artificial additives.',
      badge: 'Wholesome Food',
      accent: 'bg-[#FAF7F3]'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#26201E]" />,
      title: 'Uncompromised Safety Protocol',
      desc: 'Strict 8:30 PM safety gate timing, full CCTV perimeter coverage, dedicated security personnel, and female-only warden supervision ensure complete peace of mind.',
      badge: '24x7 Security',
      accent: 'bg-[#F4EFEB]'
    },
    {
      icon: <Droplets className="w-6 h-6 text-[#26201E]" />,
      title: 'Continuous Water & Amenities',
      desc: '24-hour uninterrupted running water, multi-stage RO purified drinking water, instant water heating for morning college preparation, and laundry drying terraces.',
      badge: 'Zero Inconvenience',
      accent: 'bg-[#FAF7F3]'
    }
  ];

  // Alumni & Resident Testimonials
  const testimonials = [
    {
      name: 'Kavitha S.',
      role: 'Final Year Student, Indhraga Ganesha College',
      text: 'Staying at Ashka made my college years completely worry-free. Anu Radha madam treats everyone like her own daughter. The home-cooked sambar and rasam taste just like my mother’s cooking!',
      stay: '2-Year Resident'
    },
    {
      name: 'Dr. Priya Ramachandran',
      role: 'Medical Intern, Trichy GH',
      text: 'The 24-hour hot water and quiet reading hall were lifesavers during my night shifts and study preparations. Safe, spotlessly clean, and located directly by the bus stop.',
      stay: '18-Month Resident'
    },
    {
      name: 'S. Soundarya',
      role: 'Software Associate, IT Firm',
      text: 'The security is unmatched. Knowing my parents didn’t have to worry about my safety or daily meals in Trichy gave me the freedom to focus 100% on my professional career.',
      stay: 'Monthly Resident'
    }
  ];

  return (
    <div ref={containerRef} className="w-full pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-24">
      {/* 1. CINEMATIC HERO SECTION WITH RICH EDITORIAL COMPOSITION */}
      <section className="relative">
        {/* Ambient Decorative Background Blur Orbs */}
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-[#DED6CC]/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#F5ECE4]/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Animated Heritage Badge */}
          <div
            ref={heroBadgeRef}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 border border-[#D4CDC4] shadow-[0_4px_16px_rgba(46,36,33,0.06)] text-xs font-semibold uppercase tracking-widest text-[#26201E]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26201E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#26201E]" />
            </span>
            <span>Trichy’s Trusted Ladies Residence · Since 2011</span>
          </div>

          {/* Grand Headline with Editorial Contrast */}
          <div className="space-y-2">
            <h1 className="about-hero-title font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#26201E] tracking-tight leading-[0.92] uppercase">
              A Home Away<br />
              <span className="font-serif italic text-[#7A5B47] font-normal lowercase tracking-normal">from</span> Home
            </h1>
            <p className="about-hero-title text-base sm:text-xl text-[#5C544F] font-normal max-w-2xl mx-auto leading-relaxed pt-2">
              Conceived with an enduring promise: empowering women and students in Trichy with genuine maternal warmth, nutritious dining, and round-the-clock protection.
            </p>
          </div>

          {/* Interactive Fast CTAs */}
          <div className="about-hero-title pt-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="ranty-btn shadow-xl hover:scale-105 transition-transform"
            >
              <span>CONNECT WITH ANU RADHA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/rooms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/rooms');
              }}
              className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#26201E] bg-white/80 hover:bg-white border border-[#D8D2CA] shadow-sm transition-all"
            >
              <span>Explore 15 Rooms</span>
            </a>
          </div>
        </div>

        {/* Dynamic Dual-Image Visual Composition with Floating Glassmorphic Badges */}
        <div className="about-hero-media mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-[36px] overflow-hidden border border-[#E0DAD2] shadow-[0_24px_70px_-15px_rgba(46,36,33,0.14)] bg-[#EAE6E1] aspect-[16/10]">
              <img
                src="/images/ai/hostel-balcony.jpg"
                alt="Ashka Ladies Hostel Architecture & Atmosphere"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Bottom Caption on Photo */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono text-[#F4EFEB]/90 block">
                    Boutique Facility
                  </span>
                  <p className="font-serif text-2xl font-bold">
                    Above State Bank of India, Madurai Road
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 text-xs">
                  <Sun className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Daylight & Fresh Air</span>
                </div>
              </div>
            </div>

            {/* Floating Top-Left Trust Stamp */}
            <div className="absolute -top-5 -left-4 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#E0DAD2] shadow-xl animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-[#26201E] text-white flex items-center justify-center font-serif font-bold text-lg">
                15+
              </div>
              <div>
                <p className="text-xs font-bold text-[#26201E] uppercase tracking-wider">Years of Trust</p>
                <p className="text-[11px] text-[#6E6660]">Established in 2011</p>
              </div>
            </div>
          </div>

          {/* Secondary Story Card & Founder's Vision (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.06)] space-y-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center text-[#26201E]">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="space-y-3">
                <p className="font-serif italic text-xl sm:text-2xl text-[#26201E] leading-snug">
                  "{HOSTEL_DATA.aboutText.mission}"
                </p>
                <footer className="pt-2 border-t border-[#F0EBE5] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-base text-[#26201E] block">
                      Anu Radha
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#8C847E]">
                      Proprietor & Warden
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#FAF7F3] border border-[#E0DAD2] text-[11px] font-mono text-[#7A5B47]">
                    Always On-Site
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Quick Feature Proof Badges */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white/80 rounded-2xl p-4 border border-[#E0DAD2] shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#26201E] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#26201E] block">100% Female</span>
                  <span className="text-[11px] text-[#8C847E]">Secure & Monitored</span>
                </div>
              </div>
              <div className="bg-white/80 rounded-2xl p-4 border border-[#E0DAD2] shadow-sm flex items-center gap-3">
                <Utensils className="w-5 h-5 text-[#26201E] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#26201E] block">3 Homely Meals</span>
                  <span className="text-[11px] text-[#8C847E]">Fresh Vegetarian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & KEY IMPACT METRICS STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { metric: '2011', label: 'Pioneering Year', detail: 'Trichy’s early boutique hostel' },
          { metric: '15', label: 'Non-AC Rooms', detail: 'Attached & common options' },
          { metric: '3x', label: 'Homely Meals Daily', detail: 'Breakfast, lunch & dinner' },
          { metric: '24/7', label: 'Water & Security', detail: 'Hot/cold water & CCTV' },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="about-stat-card bg-white rounded-3xl p-6 sm:p-7 border border-[#E0DAD2] shadow-[0_10px_30px_-8px_rgba(46,36,33,0.06)] text-center space-y-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] tracking-tight block group-hover:text-[#7A5B47] transition-colors">
              {item.metric}
            </span>
            <p className="text-xs uppercase tracking-wider font-bold text-[#26201E]">
              {item.label}
            </p>
            <p className="text-[11px] text-[#8C847E]">
              {item.detail}
            </p>
          </div>
        ))}
      </section>

      {/* 3. INTERACTIVE STORY & PHILOSOPHY TABS */}
      <section className="bg-white/80 rounded-[38px] p-6 sm:p-12 lg:p-16 border border-[#E0DAD2] shadow-[0_20px_60px_-15px_rgba(46,36,33,0.08)]">
        <Reveal staggerChildren stagger={0.08} className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
            Our Foundation & Beliefs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201E] tracking-tight">
            Why Ashka was created for women in Trichy
          </h2>
        </Reveal>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap gap-2.5 pb-8 border-b border-[#F0EBE5]">
          {[
            { id: 'mission', label: 'Our Core Purpose', icon: <HeartHandshake className="w-4 h-4" /> },
            { id: 'heritage', label: 'Reputation & Value', icon: <Award className="w-4 h-4" /> },
            { id: 'promise', label: 'The Pioneer Promise', icon: <Sparkles className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStoryTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeStoryTab === tab.id
                  ? 'bg-[#26201E] text-white shadow-md'
                  : 'bg-[#F4EFEB] text-[#5C544F] hover:bg-white hover:text-[#26201E] border border-[#E0DAD2]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="pt-8">
          {activeStoryTab === 'mission' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4 text-base sm:text-lg text-[#3D3530] leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#26201E] first-letter:mr-2 first-letter:float-left">
                  {HOSTEL_DATA.aboutText.welcome}
                </p>
                <p>
                  We recognize the emotional strength required to leave one's hometown for college or employment. Ashka was structured so no girl ever feels alone or unattended in Trichy.
                </p>
              </div>
              <div className="bg-[#FAF7F3] rounded-3xl p-6 sm:p-8 border border-[#E0DAD2] space-y-4">
                <h4 className="font-serif text-2xl font-bold text-[#26201E]">Key Pillars of Support</h4>
                <ul className="space-y-3 text-sm text-[#5C544F]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                    <span>Individual attention to sickness and emergency medical on-call assistance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                    <span>Daily hygienic room maintenance and dedicated clothes-wash areas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                    <span>Quiet reading zones promoting academic distinction for exams & interviews.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeStoryTab === 'heritage' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4 text-base sm:text-lg text-[#3D3530] leading-relaxed">
                <p>
                  {HOSTEL_DATA.aboutText.reputation}
                </p>
                <p>
                  {HOSTEL_DATA.aboutText.value}
                </p>
              </div>
              <div className="bg-[#F4EFEB] rounded-3xl p-6 sm:p-8 border border-[#E0DAD2] space-y-4">
                <h4 className="font-serif text-2xl font-bold text-[#26201E]">Transparent Pricing & Flexibility</h4>
                <p className="text-sm text-[#5C544F] leading-relaxed">
                  Monthly fee begins from ₹5,000 all-inclusive. Daily and fortnightly stay arrangements allow attendees of competitive exams, interviews, and campus placements to enjoy secure boutique lodging without rigid lock-ins.
                </p>
              </div>
            </div>
          )}

          {activeStoryTab === 'promise' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4 text-base sm:text-lg text-[#3D3530] leading-relaxed">
                <p>
                  {HOSTEL_DATA.aboutText.pioneer}
                </p>
                <p>
                  {HOSTEL_DATA.aboutText.goal}
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0DAD2] shadow-sm space-y-4">
                <h4 className="font-serif text-2xl font-bold text-[#26201E]">Convenient Prime Location</h4>
                <p className="text-sm text-[#5C544F] leading-relaxed">
                  Directly positioned above State Bank of India on Madurai Main Road, right at Edamalaipatti Pudur Bus Stop. Nearby Saranathan College, Indhraga Ganesha College, Panjappur bus stand, and easy transit to Trichy Central Railway Station.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. FOUR CORE PILLARS OF EXCELLENCE */}
      <section className="space-y-12">
        <Reveal staggerChildren stagger={0.08} className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
            The 4 Commitments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201E] tracking-tight">
            How we protect and care for every resident
          </h2>
          <p className="text-base text-[#6E6660] mt-2">
            Every operational standard at Ashka is designed around comfort, health, security, and peace of mind.
          </p>
        </Reveal>

        <Reveal staggerChildren stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-[32px] p-8 border border-[#E0DAD2] shadow-[0_12px_36px_-10px_rgba(46,36,33,0.06)] space-y-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold text-[#26201E] bg-[#FAF7F3] border border-[#E0DAD2]">
                  {pillar.badge}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#26201E] mb-2 group-hover:text-[#7A5B47] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#5C544F] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 5. INTERACTIVE 15-YEAR HERITAGE TIMELINE */}
      <section className="bg-white rounded-[38px] p-6 sm:p-12 lg:p-14 border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.06)] space-y-10">
        <Reveal staggerChildren stagger={0.08} className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
            Our Growth & Evolution
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] tracking-tight">
            15 Years of Enriching Lives in Trichy
          </h2>
          <p className="text-sm sm:text-base text-[#6E6660] mt-1">
            Explore the milestones that shaped Ashka into a trusted residential haven.
          </p>
        </Reveal>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {milestones.map((m) => {
            const isSelected = activeTimelineYear === m.year;
            return (
              <div
                key={m.year}
                onClick={() => setActiveTimelineYear(m.year)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#26201E] text-white border-[#26201E] shadow-xl scale-[1.02]'
                    : 'bg-[#FAF7F3] text-[#26201E] border-[#E0DAD2] hover:bg-white hover:border-[#26201E]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-serif text-3xl font-bold ${isSelected ? 'text-white' : 'text-[#26201E]'}`}>
                      {m.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-white text-[#8C847E] border-[#E0DAD2]'
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <h4 className={`font-serif text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-[#26201E]'}`}>
                    {m.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#6E6660]'}`}>
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center gap-1 text-[11px] font-semibold">
                  <span className={isSelected ? 'text-[#D4CDC4]' : 'text-[#7A5B47]'}>
                    {isSelected ? '✓ Active Milestone' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. VOICES OF TRUST (RESIDENT TESTIMONIALS) */}
      <section className="space-y-10">
        <Reveal staggerChildren stagger={0.08} className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
            Authentic Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] tracking-tight">
            Voices of Trust & Gratitude
          </h2>
          <p className="text-sm sm:text-base text-[#6E6660] mt-1">
            Hear from students and working women who lived at Ashka Ladies Hostel.
          </p>
        </Reveal>

        <Reveal staggerChildren stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-[32px] p-7 border border-[#E0DAD2] shadow-[0_12px_36px_-10px_rgba(46,36,33,0.06)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#7A5B47]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#3D3530] italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EBE5]">
                <p className="font-serif font-bold text-base text-[#26201E]">
                  {t.name}
                </p>
                <p className="text-xs text-[#8C847E] mt-0.5">
                  {t.role}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#FAF7F3] border border-[#E0DAD2] text-[10px] font-mono text-[#7A5B47]">
                  {t.stay}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 7. ELEGANT CONVERSION INVITATION (CONNECT WITH US) */}
      <section className="bg-white rounded-[38px] p-8 sm:p-14 text-center max-w-4xl mx-auto border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.08)] space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block">
          Welcome to Our Family
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201E] tracking-tight">
          Ready to experience safe, home-like living in Trichy?
        </h2>
        <p className="text-base text-[#6E6660] max-w-xl mx-auto leading-relaxed">
          Proprietor Anu Radha is readily available to answer your admission queries, discuss sharing options, and schedule a room viewing.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
            className="ranty-btn shadow-lg"
          >
            <span>GO TO CONTACT US</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={HOSTEL_DATA.links.enquiryWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#26201E] bg-[#F4EFEB] hover:bg-[#EAE6E1] border border-[#E0DAD2] transition-colors"
          >
            <span>Instant WhatsApp Enquiry</span>
          </a>
        </div>
      </section>
    </div>
  );
};
