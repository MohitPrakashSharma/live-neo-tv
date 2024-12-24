import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#262626] text-white z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton icon={Menu} />
          <h1 className="text-2xl font-bold">pluto tv</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <IconButton icon={Search} />
          <IconButton icon={User} />
        </div>
      </div>
    </header>
  );
};