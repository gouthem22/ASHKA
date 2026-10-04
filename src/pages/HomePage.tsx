import React, { useState } from 'react';
import {
  Phone,
  BedDouble,
  Utensils,
  Shield,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Ban,
  Play,
  Send,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { HOSTEL_DATA, GalleryPhoto } from '../data/hostelData';
import { InfiniteSpiral } from '../components/InfiniteSpiral';
import { Masonry } from '../components/Masonry';
import { Reveal } from '../components/Reveal';

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First FAQ open by default for UX and SEO

  // Selected photos for Home page Masonry
  const homeMasonryPhotos: GalleryPhoto[] = [
    HOSTEL_DATA.gallery[0], // Reception
    HOSTEL_DATA.gallery[1], // Entrance
    HOSTEL_DATA.gallery[2], // 3-Sharing room
    HOSTEL_DATA.gallery[3], // Dining hall
    HOSTEL_DATA.gallery[5], // Reading hall
    HOSTEL_DATA.gallery[6], // 8-Sharing room
    HOSTEL_DATA.gallery[9], // Rooftop dining
    HOSTEL_DATA.gallery[10], // Water purifier
    HOSTEL_DATA.gallery[11], // CCTV security
  ];

  // Comprehensive FAQ list structured for high SEO & AI Overviews (AIO) grounding
  const faqList = [
    {
      category: 'Pricing & Inclusions',
      question: 'What is the monthly fee at Ashka Ladies Hostel and what does it include?',
      answer:
        'Monthly fees start from ₹5,000 per person. This fee is all-inclusive and covers three nutritious, freshly prepared home-cooked vegetarian meals daily (breakfast, lunch, and dinner), a private cot with bed and mattress, 24-hour hot and cold running water, commercial multi-stage RO purified drinking water, high-speed Wi-Fi, and 24x7 security.',
    },
    {
      category: 'Flexible Stays',
      question: 'Are daily rentals or short-term stays available for exams and interviews?',
      answer:
        'Yes, Ashka Ladies Hostel provides flexible accommodation on daily, fortnightly, and monthly rental terms. Daily rental is frequently chosen by college students and working women attending competitive exams, university interviews, job assessments, or family visits in Trichy.',
    },
    {
      category: 'Safety & Security',
      question: 'What security measures are implemented for female students and working women?',
      answer:
        'Resident safety is our absolute priority. The hostel is strictly female-only, equipped with round-the-clock CCTV surveillance covering all entrance gates and corridors, 24-hour security personnel, and an enforced 9:00 PM gate closing protocol. The property is managed directly by female proprietor Anu Radha.',
    },
    {
      category: 'Accommodations',
      question: 'What room sharing configurations are offered?',
      answer:
        'We offer 15 clean, well-ventilated Non-AC rooms in three sharing options: 2-sharing rooms (attached bathroom), 3-sharing rooms (attached bathroom), and 8-sharing rooms (common bathrooms). Every resident is provided an individual cot, mattress, pillow, and wardrobe storage.',
    },
    {
      category: 'Location & Transit',
      question: 'Where is the hostel situated and how close is public transit?',
      answer:
        'Ashka Ladies Hostel is located at Edamalaipatti Pudur Bus Stop on Madurai Main Road, directly on the 1st and 2nd floors above State Bank of India. It is approximately 4.2 km (10 minutes) from Trichy Central Railway Station (TPJ) and 3.8 km (10 minutes) from Central Bus Stand (CBS), with local buses halting right at our doorstep.',
    },
    {
      category: 'Water & Facilities',
      question: 'What are the water and heating arrangements?',
      answer:
        'We provide 24-hour uninterrupted running water with extensive overhead water storage, instant water heaters (geysers) for warm showers during early college mornings and evenings, an industrial-grade RO water purifier, and a designated clothes-wash and laundry terrace area.',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. SOPHISTICATED FULL-WIDTH HERO WITH OVERLAYING FROSTED PANEL */}
      <section className="px-4 sm:px-6 pt-24 md:pt-28 pb-12 max-w-[1400px] mx-auto">
        <div className="relative min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] rounded-[36px] sm:rounded-[44px] overflow-hidden border border-[#E0DAD2] shadow-[0_24px_70px_-15px_rgba(46,36,33,0.12)] flex items-center p-4 sm:p-8 lg:p-14 bg-[#EAE6E1]">
          
          {/* Full-Width Background Architectural Photography */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/ai/hostel-balcony.jpg"
              alt="Ashka Ladies Hostel Architecture & Balcony"
              fetchPriority="high"
              decoding="sync"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Natural Scrim for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#26201E]/60 via-[#26201E]/25 to-transparent sm:from-[#26201E]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26201E]/40 via-transparent to-[#26201E]/20" />
          </div>

          {/* Floating Interactive Hotspot Pins on the Photography */}
          <div
            onMouseEnter={() => setActiveHotspot(1)}
            onMouseLeave={() => setActiveHotspot(null)}
            className="absolute top-1/4 right-1/4 z-10 hidden md:block cursor-pointer"
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-[#26201E] shadow-md" />
            </span>
            {activeHotspot === 1 && (
              <div className="absolute left-9 top-0 -translate-y-1/2 bg-white/95 backdrop-blur-md text-[#26201E] text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-[#E0DAD2] whitespace-nowrap z-20">
                Spacious Balcony for Study & Daylight
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setActiveHotspot(2)}
            onMouseLeave={() => setActiveHotspot(null)}
            className="absolute bottom-1/3 right-1/6 z-10 hidden md:block cursor-pointer"
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-[#26201E] shadow-md" />
            </span>
            {activeHotspot === 2 && (
              <div className="absolute right-9 top-0 -translate-y-1/2 bg-white/95 backdrop-blur-md text-[#26201E] text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-[#E0DAD2] whitespace-nowrap z-20">
                24-Hour In-Person Security & CCTV
              </div>
            )}
          </div>

          {/* Floating "ROOMTOUR" Badge on the Top-Right of the Photography */}
          <div
            onClick={() => onNavigate('/rooms')}
            className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/80 cursor-pointer transition-transform hover:scale-105 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#26201E] flex items-center justify-center text-white shrink-0 shadow-sm transition-colors group-hover:bg-[#3D3430]">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#26201E] block uppercase">
                ROOM TOUR
              </span>
              <span className="text-[11px] text-[#6E6660]">Explore 15 Rooms</span>
            </div>
          </div>

          {/* Floating Bottom Landmark Badge */}
          <div className="absolute bottom-6 right-6 z-10 hidden lg:flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/70 shadow-lg text-xs font-medium text-[#26201E]">
            <MapPin className="w-3.5 h-3.5 text-[#26201E]" />
            <span>Above State Bank of India · Madurai Road, Trichy</span>
          </div>

          {/* OVERLAYING ELEGANT FROSTED PANEL (The Boutique Hero Conversion Centerpiece) */}
          <Reveal
            staggerChildren
            stagger={0.08}
            className="relative z-20 max-w-2xl lg:max-w-xl rounded-[32px] sm:rounded-[38px] bg-white/90 sm:bg-white/92 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-10px_rgba(46,36,33,0.2)] space-y-6"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] text-xs font-semibold uppercase tracking-wider text-[#26201E]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26201E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#26201E]" />
              </span>
              <span>Admissions Open 2026 · Daily & Monthly</span>
            </div>

            {/* Editorial Stacked Serif Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#26201E] tracking-tight leading-[0.94] uppercase">
                THE<br />
                PERFECT<br />
                HOME<sup className="text-xl sm:text-2xl ml-1 font-sans font-light">®</sup>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#7A5B47] pt-1">
                "A home away from home in Trichy"
              </p>
            </div>

            {/* Tagline with Editorial Slashes */}
            <p className="text-sm sm:text-base font-normal text-[#5C544F] tracking-wide leading-relaxed">
              / Exclusively crafted for college students & working women /
            </p>

            {/* Feature Value Proof Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#26201E] border border-[#D4CDC4] shadow-sm">
                From ₹5,000 / month
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#26201E] border border-[#D4CDC4] shadow-sm">
                3 Homely Meals Daily
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#26201E] text-xs font-semibold text-white">
                24-Hour Hot & Cold Water
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href={HOSTEL_DATA.links.enquiryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="ranty-btn shadow-lg"
              >
                <span>START ENQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('/rooms')}
                className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#26201E] bg-[#F4EFEB] hover:bg-white border border-[#D8D2CA] shadow-sm transition-all flex items-center gap-2"
              >
                <span>See Rooms & Rates</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#26201E]" />
              </button>
            </div>

            {/* Direct Calling Hotline CTA */}
            <div className="pt-3 border-t border-[#F0EBE5] flex items-center justify-between">
              <a
                href={HOSTEL_DATA.links.call1}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#26201E] hover:text-[#7A5B47] transition-colors group"
                title="Call Warden Anu Radha directly"
              >
                <div className="w-7 h-7 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#26201E] group-hover:text-white transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="underline underline-offset-4 decoration-[#D4CDC4] group-hover:decoration-[#7A5B47]">
                  Call Warden Anu Radha
                </span>
              </a>
              <span className="text-[11px] font-mono text-[#8C847E]">Tap to connect directly</span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 2. FOUR CORE HIGHLIGHTS IN PURE WHITE ARCHITECTURAL CARDS */}
      <section className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <Reveal staggerChildren stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOSTEL_DATA.highlights.map((item, idx) => {
            const icons = [
              <BedDouble key="bed" className="w-5 h-5 text-[#26201E]" />,
              <Utensils key="food" className="w-5 h-5 text-[#26201E]" />,
              <Shield key="shield" className="w-5 h-5 text-[#26201E]" />,
              <Sparkles key="clean" className="w-5 h-5 text-[#26201E]" />,
            ];

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 border border-[#E0DAD2] shadow-[0_10px_30px_-8px_rgba(46,36,33,0.06)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26201E] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6E6660] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* 3. ROOMS & ACCOMMODATIONS IN REFERENCE AESTHETIC */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal staggerChildren stagger={0.08} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              (01) Accommodations
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] mt-1 tracking-tight">
              Comfortable, Non-AC rooms
            </h2>
          </div>
          <div className="px-5 py-2 rounded-full border border-[#D4CDC4] bg-white text-xs font-semibold text-[#26201E] shadow-sm">
            Starting from {HOSTEL_DATA.business.price}
          </div>
        </Reveal>

        {/* Room Cards Grid */}
        <Reveal staggerChildren stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {HOSTEL_DATA.rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-[32px] overflow-hidden border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6E1]">
                  <img
                    src={room.image}
                    alt={room.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#26201E] border border-[#D4CDC4]">
                      {room.type}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#26201E]">
                    {room.title}
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#5C544F]">
                    <div className="flex justify-between pb-1.5 border-b border-[#F0EBE5]">
                      <span>Available Rooms:</span>
                      <span className="font-semibold text-[#26201E]">{room.roomCount} rooms</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-[#F0EBE5]">
                      <span>Bathroom:</span>
                      <span className="font-semibold text-[#26201E]">{room.bathroomLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bedding:</span>
                      <span className="text-[#26201E]">Cot with bed included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Enquiry */}
              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/919443781097?text=${encodeURIComponent(
                    `Hello Anu Radha madam, I am inquiring about a ${room.title} at Ashka Ladies Hostel.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-[#26201E] hover:bg-[#3D3430] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Enquire {room.type}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 4. FACILITIES SECTION WITH INFINITESPIRAL IN CLEAN THEME */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto bg-white/70 rounded-[36px] my-8 border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.06)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <Reveal staggerChildren stagger={0.1} className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              (02) Facilities
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] leading-tight tracking-tight">
              Everything under one roof
            </h2>
            <p className="text-base text-[#6E6660] leading-relaxed max-w-md">
              Thoughtfully equipped with continuous 24-hr water, high-speed Wi-Fi, home-cooked food, lift access, and daily housekeeping for a peaceful stay.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/rooms')}
                className="ranty-btn"
              >
                <span>View Full Facilities</span>
              </button>
            </div>
          </Reveal>

          {/* Right Column: InfiniteSpiral */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <InfiniteSpiral
              items={HOSTEL_DATA.facilities}
              speed={0.4}
              direction="up"
              radius={200}
              cardWidth={220}
              cardHeight={96}
              verticalSpacing={70}
              perspective={1000}
              cardsPerTurn={7}
              cardRadius={16}
              centerScale={1.15}
              edgeFade={0.3}
              pauseOnHover={true}
            />
          </Reveal>
        </div>
      </section>

      {/* 5. RULES & LOCATION */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rules */}
          <Reveal delay={0.05} className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E0DAD2] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
                (03) Safety & Timings
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#26201E] mb-6">
                Hostel Rules
              </h3>

              <ul className="space-y-4">
                {HOSTEL_DATA.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#26201E]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#26201E] font-medium">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F0EBE5] flex items-center gap-2 text-xs text-[#8C847E]">
              <Ban className="w-4 h-4 text-[#8E705C]" />
              <span>Strictly enforced for student and resident safety</span>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal delay={0.15} className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E0DAD2] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
                (04) Location & Access
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#26201E] mb-6">
                Ideal Location in Trichy
              </h3>

              <div className="space-y-3">
                {HOSTEL_DATA.location.landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#26201E] shrink-0" />
                    <span className="text-sm sm:text-base text-[#26201E]">
                      {landmark}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F0EBE5]">
              <p className="text-xs text-[#6E6660]">
                Above State Bank of India, Madurai Road, Edamalaipatti Pudur Bus Stop
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. MASONRY PHOTO GALLERY */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <Reveal staggerChildren stagger={0.08} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              (05) Photo Gallery
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] mt-1">
              Inside Ashka Ladies Hostel
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/gallery')}
            className="ranty-btn"
          >
            <span>View Full Gallery (12 Photos)</span>
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <Masonry
            items={homeMasonryPhotos}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
          />
        </Reveal>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION (Optimized for SEO & AIO) */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
        <Reveal staggerChildren stagger={0.08} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E0DAD2] text-xs font-semibold uppercase tracking-widest text-[#26201E] mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#26201E]" />
            <span>(06) Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] tracking-tight">
            Common Questions & Answers
          </h2>
          <p className="text-base text-[#6E6660] max-w-2xl mx-auto mt-2">
            Everything you and your parents need to know about rooms, meals, security, and admissions at Ashka Ladies Hostel in Trichy.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-3xl border border-[#E0DAD2] shadow-[0_4px_16px_rgba(46,36,33,0.04)] overflow-hidden transition-all duration-300 hover:border-[#26201E]/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C847E]">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#26201E] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#26201E] text-white border-[#26201E] rotate-180'
                        : 'bg-[#F4EFEB] text-[#26201E] border-[#E0DAD2]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5C544F] leading-relaxed border-t border-[#F0EBE5]/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </Reveal>

        {/* Quick Help Strip for SEO & Direct WhatsApp Conversion */}
        <Reveal delay={0.15} className="mt-8 text-center bg-white/70 rounded-2xl p-4 border border-[#E0DAD2]">
          <p className="text-xs sm:text-sm text-[#6E6660]">
            Have a question not listed here? Speak directly with Warden Anu Radha on WhatsApp:{' '}
            <a
              href={HOSTEL_DATA.links.enquiryWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#26201E] font-bold underline underline-offset-4 hover:text-[#7A5B47]"
            >
              Ask on WhatsApp →
            </a>
          </p>
        </Reveal>
      </section>

      {/* 8. CONTACT ENQUIRY CARD */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <Reveal
          staggerChildren
          stagger={0.12}
          className="bg-white rounded-[36px] p-8 sm:p-14 text-center max-w-4xl mx-auto border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.08)]"
        >
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold mb-2 block">
            (07) Enquiries & Stays
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] mb-4">
            Have questions or want to inspect rooms?
          </h2>
          <p className="text-base sm:text-lg text-[#6E6660] max-w-xl mx-auto mb-8">
            Reach Anu Radha directly via WhatsApp or phone call for immediate vacancy status, daily rental booking, and admission details.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={HOSTEL_DATA.links.enquiryWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="ranty-btn"
            >
              <span>Enquire on WhatsApp</span>
            </a>

            <a
              href={HOSTEL_DATA.links.call2}
              className="px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#26201E] bg-[#F4EFEB] hover:bg-[#EAE6E1] border border-[#E0DAD2] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#26201E]" />
              <span>Call Warden Directly</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#F0EBE5] max-w-lg mx-auto text-xs text-[#8C847E] space-y-1">
            <p><strong>Direct Proprietor:</strong> {HOSTEL_DATA.business.contactPerson} ({HOSTEL_DATA.business.phone1}, {HOSTEL_DATA.business.phone2})</p>
            <p><strong>Official Email:</strong> {HOSTEL_DATA.business.email}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
