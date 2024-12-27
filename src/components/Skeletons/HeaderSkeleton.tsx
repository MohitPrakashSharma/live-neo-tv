import React from 'react';

export const HeaderSkeleton = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#262626] text-white z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between animate-pulse">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-24 bg-gray-700 rounded"></div>
        </div>

        {/* Mobile Menu Button Placeholder */}
        <div className="md:hidden h-6 w-6 bg-gray-700 rounded"></div>

        {/* Desktop Navigation Placeholder */}
        <div className="hidden md:flex items-center gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-6 w-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </header>
  );
};
