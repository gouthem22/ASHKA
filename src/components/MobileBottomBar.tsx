import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { HOSTEL_DATA } from '../data/hostelData';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E0DAD2] px-4 py-2.5 flex items-center gap-3 shadow-[0_-8px_20px_rgba(46,36,33,0.08)]">
      {/* Call Button */}
      <a
        href={HOSTEL_DATA.links.call2}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-xs uppercase tracking-wider bg-[#F4EFEB] text-[#26201E] border border-[#E0DAD2] shadow-sm active:scale-95 transition-transform"
        aria-label="Call Ashka Ladies Hostel"
      >
        <Phone className="w-4 h-4 text-[#26201E]" />
        <span>Call</span>
      </a>

      {/* Enquire WhatsApp Button */}
      <a
        href={HOSTEL_DATA.links.enquiryWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-xs uppercase tracking-wider bg-[#26201E] text-white shadow-sm active:scale-95 transition-transform"
        aria-label="Enquire on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 text-white" />
        <span>Enquire</span>
      </a>
    </div>
  );
};
