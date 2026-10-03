import React from 'react';
import { HOSTEL_DATA, GalleryPhoto } from '../data/hostelData';
import { Masonry } from '../components/Masonry';
import { Reveal } from '../components/Reveal';

export const GalleryPage: React.FC = () => {
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
    <div className="w-full pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header with Staggered Reveal */}
      <Reveal staggerChildren stagger={0.08} className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#8C847E] font-semibold block mb-2">
          Original Photos
        </span>
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
    </div>
  );
};
