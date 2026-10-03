import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Navigation,
  Send,
  Building2,
  Compass,
  ArrowUpRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { gsap } from 'gsap';
import { HOSTEL_DATA } from '../data/hostelData';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [stayType, setStayType] = useState('Monthly Stay');
  const [sharingPreference, setSharingPreference] = useState('3-Sharing');

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // GSAP-driven boutique entrance timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          leftColRef.current?.children || [],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.5'
        )
        .fromTo(
          rightColRef.current?.children || [],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'coords') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2500);
    }
  };

  // Formatted custom WhatsApp link based on selections
  const customWhatsAppUrl = `https://wa.me/919443781097?text=${encodeURIComponent(
    `Hello Anu Radha madam, I am inquiring about ${stayType} (${sharingPreference} room) at Ashka Ladies Hostel, Trichy. Could you please share the current vacancy and admission details?`
  )}`;

  const coordinatesText = `${HOSTEL_DATA.business.coordinates.lat}, ${HOSTEL_DATA.business.coordinates.lng}`;

  return (
    <div ref={containerRef} className="w-full pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* 1. Header with Reference Typography */}
      <div ref={headerRef} className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4CDC4] text-xs font-semibold uppercase tracking-widest text-[#26201E] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#26201E]" />
          <span>Direct Contact & Admissions</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#26201E] mb-3 tracking-tight">
          Connect with Anu Radha & Ashka
        </h1>
        <p className="text-base sm:text-lg text-[#6E6660] leading-relaxed max-w-2xl mx-auto">
          We welcome college students, working women, and visiting parents. Speak directly with Proprietor Anu Radha to confirm immediate vacancies or schedule a visit.
        </p>
      </div>

      {/* 2. Boutique 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left Column: Direct Communication Hub (7 cols) */}
        <div ref={leftColRef} className="lg:col-span-7 space-y-6">
          {/* VIP WhatsApp Card */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.08)] relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Top Bar with Live Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center text-[#26201E] shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-2xl font-bold text-[#26201E]">
                      Instant WhatsApp Chat
                    </h3>
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26201E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#26201E]" />
                    </span>
                  </div>
                  <p className="text-xs text-[#7A5B47] font-medium">Direct replies from Anu Radha · Usually &lt; 15 mins</p>
                </div>
              </div>

              <div className="px-3.5 py-1 text-xs text-[#26201E] font-mono bg-[#F8F5F1] rounded-full border border-[#E0DAD2] self-start sm:self-auto">
                +91 {HOSTEL_DATA.business.whatsappNumber}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#5C544F] leading-relaxed mb-6">
              WhatsApp is the quickest way to verify real-time room vacancies, daily or fortnightly charges, or request recent room and bathroom photos.
            </p>

            {/* Interactive Stay & Room Selector */}
            <div className="rounded-2xl bg-[#FAF7F3] border border-[#E0DAD2] p-4 sm:p-5 mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
                  Configure Your Inquiry:
                </p>
                <span className="text-[11px] text-[#8C847E]">One-tap WhatsApp formatting</span>
              </div>
              
              <div>
                <span className="text-xs text-[#26201E] block mb-2 font-medium">Duration of Stay:</span>
                <div className="flex flex-wrap gap-2">
                  {['Monthly Stay', 'Daily Rental', 'Fortnightly Stay'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setStayType(type)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        stayType === type
                          ? 'bg-[#26201E] text-white font-bold shadow-sm'
                          : 'bg-white text-[#26201E] hover:bg-[#F4EFEB] border border-[#D4CDC4]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-[#26201E] block mb-2 font-medium">Sharing Preference:</span>
                <div className="flex flex-wrap gap-2">
                  {['2-Sharing Room', '3-Sharing Room', '8-Sharing Room'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setSharingPreference(pref)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        sharingPreference === pref
                          ? 'bg-[#26201E] text-white font-bold shadow-sm'
                          : 'bg-white text-[#26201E] hover:bg-[#F4EFEB] border border-[#D4CDC4]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ranty-btn"
              >
                <Send className="w-4 h-4" />
                <span>Launch WhatsApp Inquiry</span>
              </a>

              <a
                href={HOSTEL_DATA.links.directWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#26201E] bg-[#F4EFEB] hover:bg-[#EAE6E1] border border-[#E0DAD2] transition-colors"
              >
                Standard Chat
              </a>
            </div>
          </div>

          {/* Interactive Direct Calling Lines */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center text-[#26201E]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#26201E]">
                    Direct Phone Calling
                  </h3>
                  <p className="text-xs text-[#7A5B47] font-medium">Calling Hours: 7:00 AM – 9:30 PM (Daily)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F4EFEB] text-xs font-medium text-[#26201E] hidden sm:block border border-[#E0DAD2]">
                Instant Connect
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Line 1: Primary Mobile */}
              <a
                href={HOSTEL_DATA.links.call1}
                className="p-4 rounded-2xl bg-[#FAF7F3] hover:bg-[#F4EFEB] border border-[#E0DAD2] transition-all duration-200 group flex items-start justify-between shadow-sm"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block mb-1">
                    Primary Office & Mobile
                  </span>
                  <p className="font-mono text-lg font-bold text-[#26201E]">
                    {HOSTEL_DATA.business.phone1}
                  </p>
                  <p className="text-xs text-[#6E6660] mt-1">Tap to call reception</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E0DAD2] group-hover:bg-[#26201E] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#26201E] group-hover:text-white" />
                </div>
              </a>

              {/* Line 2: Anu Radha Direct */}
              <a
                href={HOSTEL_DATA.links.call2}
                className="p-4 rounded-2xl bg-[#FAF7F3] hover:bg-[#F4EFEB] border border-[#E0DAD2] transition-all duration-200 group flex items-start justify-between shadow-sm"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block mb-1">
                    Anu Radha (Proprietor)
                  </span>
                  <p className="font-mono text-lg font-bold text-[#26201E]">
                    {HOSTEL_DATA.business.phone2}
                  </p>
                  <p className="text-xs text-[#6E6660] mt-1">Direct management line</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E0DAD2] group-hover:bg-[#26201E] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#26201E] group-hover:text-white" />
                </div>
              </a>
            </div>
          </div>

          {/* Official Email Communication */}
          <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E0DAD2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_16px_40px_-10px_rgba(46,36,33,0.06)]">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center text-[#26201E]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block">
                  Official Email Address
                </span>
                <p className="font-mono text-base sm:text-lg font-bold text-[#26201E]">
                  {HOSTEL_DATA.business.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => copyToClipboard(HOSTEL_DATA.business.email, 'email')}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#26201E] bg-[#F4EFEB] hover:bg-[#EAE6E1] border border-[#E0DAD2] transition-colors flex items-center gap-1.5"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#26201E]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#26201E]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={HOSTEL_DATA.links.email}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#26201E] hover:bg-[#3D3430] transition-colors flex items-center gap-1"
              >
                <span>Compose</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Map & Coordinates HUD (5 cols) */}
        <div ref={rightColRef} className="lg:col-span-5 space-y-6">
          {/* Coordinates HUD & Map */}
          <div className="bg-white rounded-[32px] p-6 border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.08)]">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAE6E1]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#26201E] animate-spin" style={{ animationDuration: '14s' }} />
                <span className="text-xs font-mono font-bold tracking-wider text-[#26201E] uppercase">
                  GPS Coordinates HUD
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(coordinatesText, 'coords')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] text-[11px] font-mono text-[#26201E] hover:bg-[#EAE6E1]"
              >
                {copiedCoords ? (
                  <>
                    <Check className="w-3 h-3 text-[#26201E]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#26201E]" />
                    <span>Copy Lat/Lng</span>
                  </>
                )}
              </button>
            </div>

            {/* Latitude / Longitude Matrix */}
            <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF7F3] border border-[#E0DAD2]">
                <span className="text-[10px] text-[#8C847E] block uppercase font-bold">LATITUDE</span>
                <span className="text-[#26201E] font-bold text-sm">{HOSTEL_DATA.business.coordinates.lat}° N</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF7F3] border border-[#E0DAD2]">
                <span className="text-[10px] text-[#8C847E] block uppercase font-bold">LONGITUDE</span>
                <span className="text-[#26201E] font-bold text-sm">{HOSTEL_DATA.business.coordinates.lng}° E</span>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-[#E0DAD2] bg-[#EAE6E1] mb-4 shadow-inner">
              <iframe
                src={HOSTEL_DATA.business.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ashka Ladies Hostel Map Position"
                className="w-full h-full"
              />
            </div>

            {/* Address Landmark Callout */}
            <div className="p-4 rounded-2xl bg-[#FAF7F3] border border-[#E0DAD2] mb-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#8C847E] font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#26201E]" />
                <span>Physical Address</span>
              </div>
              <p className="text-sm text-[#26201E] font-medium leading-relaxed">
                {HOSTEL_DATA.business.address}
              </p>
              <p className="text-xs text-[#7A5B47] font-semibold pt-0.5">
                Key Landmark: 1st & 2nd Floor Above State Bank of India
              </p>
            </div>

            {/* Navigation Button */}
            <a
              href={`https://www.google.com/maps?q=${HOSTEL_DATA.business.coordinates.lat},${HOSTEL_DATA.business.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-[#26201E] hover:bg-[#3D3430] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>Navigate in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>
          </div>

          {/* Transit & Proximity */}
          <div className="bg-white rounded-[32px] p-6 border border-[#E0DAD2] space-y-3 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block">
              Proximity & Access Times
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                <span className="text-[#5C544F] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#26201E]" />
                  <span>Edamalaipatti Pudur Bus Stop</span>
                </span>
                <span className="text-[#26201E] font-bold">At Doorstep (0 min)</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                <span className="text-[#5C544F] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#26201E]" />
                  <span>State Bank of India (Branch)</span>
                </span>
                <span className="text-[#26201E] font-bold">Ground Floor</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                <span className="text-[#5C544F]">Trichy Central Railway Station (TPJ)</span>
                <span className="text-[#26201E] font-semibold">~4.2 km (10 mins)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5C544F]">Central Bus Stand (CBS)</span>
                <span className="text-[#26201E] font-semibold">~3.8 km (10 mins)</span>
              </div>
            </div>
          </div>

          {/* Visiting Protocol */}
          <div className="bg-white rounded-[32px] p-6 border border-[#E0DAD2] space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C847E] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#26201E]" />
              <span>Visiting & Admissions Checklist</span>
            </div>
            
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C544F]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                <span>Parents and guardians are welcome to inspect rooms between 9:00 AM – 7:30 PM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                <span>Strict 9:00 PM gate closing time maintained daily for resident safety.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#26201E] shrink-0 mt-0.5" />
                <span>Required for admission: Aadhaar card copy, college/work ID, and 2 photos.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
