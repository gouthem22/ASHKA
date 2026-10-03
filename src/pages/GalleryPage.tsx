import React from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { HOSTEL_DATA, GalleryPhoto } from '../data/hostelData';
import { Masonry } from '../components/Masonry';
import { Reveal } from '../components/Reveal';

interface GalleryPageProps {
  onNavigate?: (href: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  // Combine all verified original photos
  const allGalleryPhotos: GalleryPhoto[] = [
    ...HOSTEL_DATA.gallery,
    {
      id: 'banner-sd1',
      img: '/images/old-site/sd1.png',
      url: '/images/old-site/sd1.png',
      title: 'Ashka Building & Signboard (Above SBI Bank)',
      aspectRatio: 1400 / 460,
      height: 263,
    },
    {
      id: 'banner-sd2',
      img: '/images/old-site/sd2.png',
      url: '/images/old-site/sd2.png',
      title: 'Dining Hall Facility',
      aspectRatio: 1400 / 460,
      height: 263,
    },
    {
      id: 'banner-sd3',
      img: '/images/old-site/sd3.png',
      url: '/images/old-site/sd3.png',
      title: 'Hostel Rooms & Hallway',
      aspectRatio: 1400 / 460,
      height: 263,
    },
  ];

  return (
    <div className="w-full pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Header with Staggered Reveal */}
      <Reveal staggerChildren stagger={0.08} className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4CDC4] text-xs font-semibold uppercase tracking-widest text-[#26201E] mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#26201E]" />
          <span>Authentic Photography</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#26201E] mb-3 tracking-tight">
          Hostel Photo Gallery
        </h1>
        <p className="text-base sm:text-lg text-[#6E6660]">
          Authentic views of rooms, dining hall, reading areas, and safety systems at Ashka Ladies Hostel. Tap any photo to view in full resolution.
        </p>
      </Reveal>

      {/* Masonry Photo Grid wrapped in Reveal */}
      <Reveal delay={0.1}>
        <Masonry
          items={allGalleryPhotos}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </Reveal>

      {/* Distinct Visual Separator & Transition to Contact Us */}
      <div className="pt-8 border-t border-[#E0DAD2]">
        <Reveal
          staggerChildren
          stagger={0.1}
          className="bg-white rounded-[36px] p-8 sm:p-12 border border-[#E0DAD2] shadow-[0_20px_50px_rgba(46,36,33,0.06)] text-center max-w-3xl mx-auto space-y-5"
        >
          <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block">
            Admissions & Stays
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26201E] tracking-tight">
            Interested in visiting or reserving a room?
          </h2>
          <p className="text-sm sm:text-base text-[#6E6660] max-w-lg mx-auto">
            Contact Anu Radha directly to confirm immediate room vacancies, flexible daily/monthly rates, or schedule an in-person tour.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="ranty-btn shadow-md"
              >
                <span>VISIT CONTACT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href={HOSTEL_DATA.links.enquiryWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#26201E] bg-[#F4EFEB] hover:bg-[#EAE6E1] border border-[#E0DAD2] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#26201E]" />
              <span>WhatsApp Anu Radha</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
