import React, { useState, useEffect } from 'react';
import { PillNav } from './components/PillNav';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  // Normalize current path from window.location
  const getNormalizedPath = () => {
    const path = window.location.pathname || '/';
    // Remove trailing slash if not root
    if (path.length > 1 && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath());

  // Listen to browser forward/backward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href: string) => {
    if (href !== currentPath) {
      window.history.pushState({}, '', href);
      setCurrentPath(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Rooms & Facilities', href: '/rooms' },
    { label: 'Gallery', href: '/gallery' },
  ];

  // Route renderer
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/rooms':
        return <RoomsPage onNavigate={navigate} />;
      case '/gallery':
        return <GalleryPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EAE6E1] text-[#26201E] flex flex-col justify-between selection:bg-[#26201E] selection:text-white">
      {/* 0. Thin Gold Scroll Progress Indicator */}
      <ScrollProgress currentPath={currentPath} />

      {/* 1. Navigation Bar (PillNav always visible at the top) */}
      <PillNav
        items={navItems}
        activeHref={currentPath}
        onNavigate={navigate}
        logoSrc="/logo/ashka-logo.png"
        baseColor="#6E2F3B"
        pillColor="#FFF4EF"
        pillTextColor="#3A1F26"
        hoveredPillTextColor="#FFFFFF"
        ease="power3.easeOut"
        initialLoadAnimation={true}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </main>

      {/* 3. Footer (Logo, address, phone numbers, and email) */}
      <Footer onNavigate={navigate} />

      {/* 4. Mobile Bottom Call and Enquire Bar */}
      <MobileBottomBar />
    </div>
  );
}
