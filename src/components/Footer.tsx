import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm py-4 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Match Mind</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 • Challenge your memory daily
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;