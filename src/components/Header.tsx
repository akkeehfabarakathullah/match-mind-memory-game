import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-grey/80 backdrop-blur-lg shadow-md py-4 sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-ping"></div>
            <Brain
              className="text-blue-600 h-9 w-9 relative z-10 animate-pulse"
              aria-label="Match Mind Logo"
            />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm"
            aria-label="Match Mind"
          >
            Match Mind
          </h1>
        </div>

        {/* Slogan */}
        <div className="hidden sm:block text-sm sm:text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Train your memory
        </div>
      </div>
    </header>
  );
};

export default Header;
