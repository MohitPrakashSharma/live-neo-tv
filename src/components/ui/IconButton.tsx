import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  showLabel?: boolean;
}

export const IconButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active, 
  showLabel 
}: IconButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition
        ${active ? 'text-[#e40876]' : 'hover:bg-gray-700'}`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      {showLabel && label && (
        <span className="text-sm">{label}</span>
      )}
    </button>
  );
};