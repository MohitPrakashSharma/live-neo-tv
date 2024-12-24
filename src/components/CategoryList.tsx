import React from 'react';
import { categories } from '../data/channels';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

export const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
      <h2 className="p-4 text-lg font-semibold border-b border-gray-800">Categories</h2>
      <div className="py-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`w-full px-4 py-3 text-left hover:bg-[#303030] transition-colors duration-200 ${
              selectedCategory === category.id ? 'bg-[#303030] text-[#e40876]' : ''
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};