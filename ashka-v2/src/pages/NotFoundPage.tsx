import React from 'react';
import { Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (href: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="frosted-panel p-8 sm:p-12 text-center max-w-md w-full border border-[#EAB780]/30 shadow-2xl">
        <span className="font-serif text-6xl sm:text-7xl font-bold text-[#EAB780] block mb-2">
          404
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDF4F3] mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#FDF4F3]/80 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. We welcome you to return to our home page.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-[#FFF4EF] bg-[#6E2F3B] hover:bg-[#9E4A57] border border-[#EAB780]/40 transition-colors shadow-lg active:scale-95"
        >
          <Home className="w-4 h-4 text-[#EAB780]" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
