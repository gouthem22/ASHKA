/**
 * Ashka Ladies Hostel (Trichy) - Master Data Configuration
 * Strictly original details as provided in client specifications.
 */

export interface FacilityItem {
  id: string;
  name: string;
  iconName: string;
}

export interface RoomItem {
  id: string;
  title: string;
  type: string;
  roomCount: number;
  bathroomType: 'attached' | 'common';
  bathroomLabel: string;
  features: string[];
  image: string;
  hasVideo?: boolean;
}

export interface GalleryPhoto {
  id: string;
  img: string;
  url: string;
  title: string;
  aspectRatio: number; // width / height
  height: number;      // 800 * height / width (standardized for Masonry)
}

export const HOSTEL_DATA = {
  business: {
    name: 'Ashka Ladies Hostel (Trichy)',
    shortName: 'Ashka Ladies Hostel',
    tagline: 'A home away from home in Trichy',
    audience: 'College students and working women',
    stays: 'Daily, fortnightly and monthly (daily rental is available)',
    price: 'From 5,000 rupees, including food and accommodation',
    food: 'Three times a day, homely food',
    roomCountTotal: '15 rooms in total, all NON-AC. A cot with bed is included.',
    contactPerson: 'Anu Radha',
    phone1: '9597640242',
    phone2: '9943970585',
    whatsappNumber: '+91 99439 70585',
    whatsappDigits: '919943970585',
    email: 'ashkahostel@gmail.com',
    address: 'Ashka Building, Above SBI Bank, Madurai Road, Edamalaipatti Pudur Bus Stop, Edamalaipatti Pudur, Tiruchirappalli, Tamil Nadu 620012',
    coordinates: {
      lat: 10.77422,
      lng: 78.668686,
    },
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.93463775143!2d78.668686!3d10.77422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6a720266b330f675!2sAshka++Ladies+Hostel!5e0!3m2!1sen!2sin!4v1499402474730',
  },
  links: {
    enquiryWhatsApp: 'https://wa.me/919943970585?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20room%20at%20Ashka%20Ladies%20Hostel%2C%20Trichy',
    directWhatsApp: 'https://wa.me/919943970585',
    call1: 'tel:9597640242',
    call2: 'tel:9943970585',
    email: 'mailto:ashkahostel@gmail.com',
  },
  highlights: [
    { title: 'Non-AC Rooms', desc: '15 well-ventilated rooms with cot and bed included' },
    { title: 'Three Homely Meals', desc: 'Fresh, hygienic home-made vegetarian food every day' },
    { title: 'CCTV Security', desc: '24-hour professional security and continuous surveillance' },
    { title: 'Daily Cleaning', desc: 'Well-trained housekeeping and hygienic living conditions' },
  ],
  rooms: [
    {
      id: '2-sharing',
      title: '2-Sharing Room',
      type: '2-sharing',
      roomCount: 2,
      bathroomType: 'attached',
      bathroomLabel: 'Attached bathroom',
      features: ['2 rooms available', 'Attached bathroom', 'Non-AC', 'Cot with bed included'],
      image: '/images/ai/2-sharing-room.jpg',
      hasVideo: false,
    },
    {
      id: '3-sharing',
      title: '3-Sharing Room',
      type: '3-sharing',
      roomCount: 2,
      bathroomType: 'attached',
      bathroomLabel: 'Attached bathroom',
      features: ['2 rooms available', 'Attached bathroom', 'Non-AC', 'Cot with bed included'],
      image: '/images/gallery/3.png', // Original gallery photo 3
      hasVideo: false,
    },
    {
      id: '8-sharing',
      title: '8-Sharing Room',
      type: '8-sharing',
      roomCount: 11,
      bathroomType: 'common',
      bathroomLabel: 'Common bathroom',
      features: ['11 rooms available', 'Common bathroom', 'Non-AC', 'Cot with bed included'],
      image: '/images/gallery/7.png', // Original gallery photo 7
      hasVideo: false,
    },
  ] as RoomItem[],
  facilities: [
    { id: 'f1', name: '24-hour hot and cold water', iconName: 'Droplets' },
    { id: 'f2', name: 'Water heater', iconName: 'Flame' },
    { id: 'f3', name: 'Water purifier', iconName: 'ShieldCheck' },
    { id: 'f4', name: 'Unlimited free Wi-Fi', iconName: 'Wifi' },
    { id: 'f5', name: 'Lift', iconName: 'ArrowUpDown' },
    { id: 'f6', name: 'Rooftop dining', iconName: 'Utensils' },
    { id: 'f7', name: 'CCTV', iconName: 'Video' },
    { id: 'f8', name: '24x7 helpline', iconName: 'PhoneCall' },
    { id: 'f9', name: 'Reading hall', iconName: 'BookOpen' },
    { id: 'f10', name: 'Club hall with TV', iconName: 'Tv' },
    { id: 'f11', name: 'Clothes-wash area and laundry', iconName: 'Shirt' },
    { id: 'f12', name: 'Housekeeping staff', iconName: 'Sparkles' },
    { id: 'f13', name: '24-hour security', iconName: 'Lock' },
    { id: 'f14', name: 'Doctor on call', iconName: 'Stethoscope' },
    { id: 'f15', name: 'Daily cleaning', iconName: 'CheckCircle' },
    { id: 'f16', name: 'Spacious balcony for study and work', iconName: 'Sun' },
    { id: 'f17', name: 'Three homely meals a day', iconName: 'Soup' },
  ] as FacilityItem[],
  rules: [
    'Be back at the hostel before 8:30 in the evening',
    'No travelling at night',
    'Late-night check-out is not available',
    'Early-morning check-in is not available',
  ],
  location: {
    summary: 'Near a bus stand and the main road, with all shops nearby; Panjappur bus stand is nearby; ITC factory is nearby; Saranathan college and Indhraga Ganesha college are nearby; the railway station is easy to reach; frequent travel is easy from the hostel.',
    landmarks: [
      'Near bus stand and the main road',
      'All shops nearby',
      'Panjappur bus stand is nearby',
      'ITC factory is nearby',
      'Saranathan college is nearby',
      'Indhraga Ganesha college is nearby',
      'Railway station is easy to reach',
      'Frequent travel is easy from the hostel',
    ],
  },
  banners: [
    { id: 'sd1', img: '/images/old-site/sd1.png', alt: 'Ashka Building exterior showing hostel location above SBI Bank' },
    { id: 'sd2', img: '/images/old-site/sd2.png', alt: 'Dining area and hall facilities at Ashka Ladies Hostel' },
    { id: 'sd3', img: '/images/old-site/sd3.png', alt: 'Deluxe rooms and hallway accommodation at Ashka Ladies Hostel' },
  ],
  gallery: [
    {
      id: 'g1',
      img: '/images/gallery/1.png',
      url: '/images/gallery/1.png',
      title: 'Reception & Front Office',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g2',
      img: '/images/gallery/2.png',
      url: '/images/gallery/2.png',
      title: 'Hostel Main Entrance',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g3',
      img: '/images/gallery/3.png',
      url: '/images/gallery/3.png',
      title: '3-Sharing Room Accommodation',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g4',
      img: '/images/gallery/4.png',
      url: '/images/gallery/4.png',
      title: 'Dining Hall Seating & Tables',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g5',
      img: '/images/gallery/5.png',
      url: '/images/gallery/5.png',
      title: 'Clean Corridor & Staircase Access',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g6',
      img: '/images/gallery/6.png',
      url: '/images/gallery/6.png',
      title: 'Reading Hall & Common Area',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g7',
      img: '/images/gallery/7.png',
      url: '/images/gallery/7.png',
      title: '8-Sharing Room Facility',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g8',
      img: '/images/gallery/8.png',
      url: '/images/gallery/8.png',
      title: 'Hygienic Attached Bathroom',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g9',
      img: '/images/gallery/9.png',
      url: '/images/gallery/9.png',
      title: 'Clothes-Wash & Laundry Area',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g10',
      img: '/images/gallery/10.png',
      url: '/images/gallery/10.png',
      title: 'Rooftop Dining Facility',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g11',
      img: '/images/gallery/11.png',
      url: '/images/gallery/11.png',
      title: 'Water Purifier & Safe Drinking Water',
      aspectRatio: 800 / 600,
      height: 600,
    },
    {
      id: 'g12',
      img: '/images/gallery/12.png',
      url: '/images/gallery/12.png',
      title: 'CCTV Surveillance & Security Setup',
      aspectRatio: 800 / 600,
      height: 600,
    },
  ] as GalleryPhoto[],
  aboutText: {
    welcome: 'Ashka Ladies Hostel is a new Ladies Hostel constructed exclusively to offer excellent services for WOMEN. We understand what a woman goes through in their everyday life. We know the struggles she needs to face in this competitive world. Working and staying away from home can be very stressful to many of us at times. We miss the way our mother takes care of us, the way everything is kept ready for us.',
    reputation: 'Our Ladies Hostel is perceived as one of the exceedingly reputed lodging administration providers offering different sorts of hostel facilities and rooms on daily, fortnightly and monthly basis.',
    value: 'We provide the best accommodation at most affordable rates with all latest amenities. The Ladies Hostel has all the facilities like deluxe rooms with attached bathrooms, ample water supply and treated drinking water, home-made vegetarian food with a friendly atmosphere, proper power supply and ventilation in every room.',
    pioneer: 'Our Ladies Hostel pioneered the concept of the ladies hostel in Trichy and is also undoubtedly its quality provider. We have redefined corporate and student accommodations with our focus on ideal location near the colleges.',
    mission: 'Our service is to create an ideal living condition and atmosphere for students and working women coming from various parts of Tamil Nadu to the city of Trichy for higher studies and jobs. Ashka Ladies Hostel is designed for providing individual comfort, peaceful study areas, a comfortable atmosphere, individual care and assistance.',
    goal: 'Our goal is to make our inmates feel that they truly are at a home away from home.',
  },
};
