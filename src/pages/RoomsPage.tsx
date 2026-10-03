import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOSTEL_DATA } from '../data/hostelData';
import { Reveal } from '../components/Reveal';
import { InfiniteSpiral } from '../components/InfiniteSpiral';
import { WaterFacilitiesShowcase } from '../components/WaterFacilitiesShowcase';

interface RoomsPageProps {
  onNavigate?: (href: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = () => {
  return (
    <div className="w-full pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <Reveal staggerChildren stagger={0.08} className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
          Accommodation & Amenities
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#26201E] mb-3 tracking-tight">
          Rooms & Facilities
        </h1>
        <p className="text-base sm:text-lg text-[#6E6660]">
          15 rooms in total, all Non-AC. A cot with bed is included in every room.
        </p>
      </Reveal>

      {/* Pricing & Key Terms Banner */}
      <Reveal delay={0.1} className="bg-white rounded-[32px] p-6 sm:p-8 mb-16 border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#EAE6E1]">
          <div className="sm:pr-6 pt-2 sm:pt-0">
            <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block mb-1">
              Pricing
            </span>
            <p className="font-serif text-3xl font-bold text-[#26201E]">
              {HOSTEL_DATA.business.price}
            </p>
          </div>
          <div className="sm:px-6 pt-4 sm:pt-0">
            <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block mb-1">
              Flexible Stays
            </span>
            <p className="text-base font-semibold text-[#26201E]">
              Daily, fortnightly & monthly stays
            </p>
            <p className="text-xs text-[#7A5B47] mt-0.5 font-medium">
              Daily rental is available
            </p>
          </div>
          <div className="sm:pl-6 pt-4 sm:pt-0">
            <span className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold block mb-1">
              Food Included
            </span>
            <p className="text-base font-semibold text-[#26201E]">
              Three times a day, homely food
            </p>
            <p className="text-xs text-[#6E6660] mt-0.5">
              Clean vegetarian kitchen
            </p>
          </div>
        </div>
      </Reveal>

      {/* 1. ROOM TYPES */}
      <section className="mb-20">
        <Reveal delay={0.05} className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
            Room Options
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] mt-1 tracking-tight">
            Choose Your Accommodation
          </h2>
        </Reveal>

        <Reveal staggerChildren stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOSTEL_DATA.rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-[32px] overflow-hidden border border-[#E0DAD2] shadow-[0_16px_40px_-10px_rgba(46,36,33,0.08)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Photo Area */}
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6E1]">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#26201E] border border-[#D4CDC4]">
                      {room.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                      {room.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm text-[#5C544F]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                      <span>Available Rooms:</span>
                      <span className="font-bold text-[#26201E]">{room.roomCount} rooms</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                      <span>Bathroom:</span>
                      <span className="font-bold text-[#26201E]">{room.bathroomLabel}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE5]">
                      <span>Cooling:</span>
                      <span className="font-semibold text-[#26201E]">Non-AC with fan</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bed & Linen:</span>
                      <span className="font-semibold text-[#26201E]">Cot with bed included</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="px-4 py-2 text-center text-xs font-medium text-[#7A5B47] bg-[#F8F5F1] rounded-full border border-[#E0DAD2]">
                  Daily, fortnightly or monthly stay
                </div>
                <a
                  href={`https://wa.me/919443781097?text=${encodeURIComponent(
                    `Hello Anu Radha madam, I am inquiring about room vacancies for ${room.title} at Ashka Ladies Hostel.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-[#26201E] hover:bg-[#3D3430] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Enquire Vacancy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 2. HOSTEL FACILITIES (InfiniteSpiral Motion Showcase in Clean Theme) */}
      <section className="mb-20">
        <div className="rounded-[36px] bg-white border border-[#E0DAD2] p-6 sm:p-10 mb-12 shadow-[0_20px_50px_rgba(46,36,33,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <Reveal delay={0.05} className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
                Full Amenities
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#26201E] leading-tight tracking-tight">
                Hostel Facilities
              </h2>
              <p className="text-base text-[#6E6660] leading-relaxed">
                Every convenience designed for students and working women—experience round-the-clock water, high-speed Wi-Fi, pure RO drinking water, 3 homely meals a day, and 24x7 security.
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] text-xs font-semibold text-[#26201E]">
                  17 Facilities Included
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-[#E0DAD2] text-xs font-semibold text-[#26201E]">
                  3 Homely Meals Daily
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#26201E] text-xs font-semibold text-white">
                  24x7 Security & CCTV
                </span>
              </div>
            </Reveal>

            {/* Right Column: InfiniteSpiral Component */}
            <div className="lg:col-span-7">
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
            </div>
          </div>
        </div>

        {/* Animated Water & Essential Infrastructure Showcase */}
        <Reveal delay={0.08}>
          <WaterFacilitiesShowcase />
        </Reveal>

        {/* Spacious Balcony Feature Spotlight */}
        <Reveal delay={0.1} className="bg-white rounded-[36px] overflow-hidden border border-[#E0DAD2] grid grid-cols-1 md:grid-cols-12 items-center shadow-[0_20px_50px_rgba(46,36,33,0.06)]">
          <div className="md:col-span-6 relative aspect-[4/3] w-full bg-[#EAE6E1]">
            <img
              src="/images/ai/hostel-balcony.jpg"
              alt="Spacious balcony for study and work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-6 p-6 sm:p-10 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              Facility Spotlight
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#26201E]">
              Spacious Balcony for Study and Work
            </h3>
            <p className="text-sm sm:text-base text-[#6E6660] leading-relaxed">
              An airy, peaceful residential balcony area equipped for focused study and quiet relaxation. Designed so residents have access to open daylight and fresh air away from indoor study rooms.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 3. HOSTEL RULES */}
      <section className="mb-20">
        <Reveal delay={0.05} className="bg-white rounded-[36px] p-8 sm:p-12 border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.06)]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold">
              Safety & Regulations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] mt-1 tracking-tight">
              Hostel Rules
            </h2>
            <p className="text-sm text-[#6E6660] mt-1">
              Maintained strictly for the security, peaceful rest, and safety of all inmates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOSTEL_DATA.rules.map((rule, idx) => (
              <div
                key={rule}
                className="p-5 rounded-2xl flex items-start gap-4 bg-[#F8F5F1] border border-[#EAE6E1]"
              >
                <span className="w-7 h-7 rounded-full bg-[#26201E] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base text-[#26201E] font-medium leading-snug">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 4. END WITH ENQUIRE BUTTON */}
      <Reveal delay={0.1} className="bg-white rounded-[36px] p-8 sm:p-12 text-center border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.06)] max-w-3xl mx-auto">
        <h3 className="font-serif text-3xl font-bold text-[#26201E] mb-2">
          Ready to book your stay?
        </h3>
        <p className="text-sm sm:text-base text-[#6E6660] max-w-lg mx-auto mb-6">
          Contact Anu Radha to verify room vacancies, sharing options, and daily stays.
        </p>
        <a
          href={HOSTEL_DATA.links.enquiryWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="ranty-btn"
        >
          <span>Enquire on WhatsApp</span>
        </a>
      </Reveal>
    </div>
  );
};
