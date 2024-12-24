import React from 'react';

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    image: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const CategoryItem = ({ category, isSelected, onSelect }: CategoryItemProps) => {
  return (
    <button
      className={`w-full px-3 py-2 text-left transition-all duration-200 flex items-center gap-2 rounded-lg ${
        isSelected 
          ? 'bg-[#303030] text-[#e40876]' 
          : 'hover:bg-[#303030] hover:text-[#e40876]/80'
      }`}
      onClick={() => onSelect(category.id)}
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-5 h-5 rounded-full object-cover"
      />
      <span className="block truncate text-sm md:text-base">{category.name}</span>
    </button>
  );
};