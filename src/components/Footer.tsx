import React from 'react';
import { HOSTEL_DATA } from '../data/hostelData';
import { Reveal } from './Reveal';

interface FooterProps {
  onNavigate?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-white/90 border-t border-[#E0DAD2] py-12 px-6 text-[#26201E]">
      <Reveal staggerChildren stagger={0.08} className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Whole Logo */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-auto flex items-center justify-center shrink-0">
            <img
              src="/logo/ashka-logo-transparent.png"
              alt="Ashka Ladies Hostel Logo"
              className="h-full w-auto object-contain drop-shadow-sm"
            />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#26201E] uppercase">
              {HOSTEL_DATA.business.shortName}
            </h3>
            <p className="text-xs text-[#8C847E]">
              Tiruchirappalli, Tamil Nadu
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="max-w-md text-sm text-[#5C544F] leading-relaxed">
          <p className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold mb-1">
            Address
          </p>
          <p>{HOSTEL_DATA.business.address}</p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-1.5 text-sm">
          <p className="text-xs uppercase tracking-wider text-[#8C847E] font-semibold mb-0.5">
            Contact Details
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#8C847E]">Contact Person: {HOSTEL_DATA.business.contactPerson}</span>
            <div className="flex items-center gap-3 font-mono font-medium text-[#26201E]">
              <a
                href={HOSTEL_DATA.links.call1}
                className="hover:text-[#7A5B47] transition-colors underline-offset-4 hover:underline"
              >
                {HOSTEL_DATA.business.phone1}
              </a>
              <span>·</span>
              <a
                href={HOSTEL_DATA.links.call2}
                className="hover:text-[#7A5B47] transition-colors underline-offset-4 hover:underline"
              >
                {HOSTEL_DATA.business.phone2}
              </a>
            </div>
            <a
              href={HOSTEL_DATA.links.email}
              className="hover:text-[#7A5B47] transition-colors text-xs text-[#5C544F] underline-offset-4 hover:underline"
            >
              {HOSTEL_DATA.business.email}
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
};
