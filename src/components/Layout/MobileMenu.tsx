import React from 'react';
import { Home, Tv, PlaySquare, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayStore: () => void;
}

export const MobileMenu = ({ isOpen, onClose, onPlayStore }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] z-[100]">
      <div className="relative h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Link to="/" onClick={onClose}>
            <img 
              src="https://neotvapp.com/wp-content/uploads/2024/09/logo.svg" 
              alt="NeoTV+"
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col p-4">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            <Home className="w-6 h-6" />
            <span className="text-lg">Home</span>
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-4 bg-gray-800 rounded-lg text-[#e40876] mt-2"
            onClick={onClose}
          >
            <Tv className="w-6 h-6" />
            <span className="text-lg">Live TV</span>
          </Link>
          
          <button 
            onClick={() => {
              onPlayStore();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-800 rounded-lg transition-colors mt-2 text-left"
          >
            <PlaySquare className="w-6 h-6" />
            <span className="text-lg">Get Mobile App</span>
          </button>
          
          <button 
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-800 rounded-lg transition-colors mt-2 text-left"
            onClick={onClose}
          >
            <User className="w-6 h-6" />
            <span className="text-lg">My Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};