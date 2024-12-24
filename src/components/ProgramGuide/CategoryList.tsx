import React, { useState } from 'react';
import { ListFilter, ChevronDown, ChevronUp } from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { useCategories } from '../../hooks/useCategories';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
  isExpanded: boolean;
}

export const CategoryList = ({ 
  selectedCategory, 
  onCategorySelect,
  isExpanded 
}: CategoryListProps) => {
  const { categories, loading, error } = useCategories();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isTop = target.scrollTop === 0;
    const isBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 1;
    
    setIsScrolledToTop(isTop);
    setIsScrolledToBottom(isBottom);
  };

  const selectedCategoryData = categories.find(c => c.id.toString() === selectedCategory);

  if (loading) {
    return (
      <div className="w-full md:w-64 bg-[#1e1e1e] rounded-lg p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-10 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-64 bg-[#1e1e1e] rounded-lg p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`w-full md:w-64 transition-all duration-300 ${
      isExpanded ? 'md:sticky md:top-20' : ''
    } self-start`}>
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
        {/* Mobile Accordion Header */}
        <button
          className="w-full md:hidden p-4 border-b border-gray-800 flex items-center justify-between"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-[#e40876]" />
            <span className="text-lg font-semibold">
              {selectedCategoryData ? selectedCategoryData.insert_language : 'Categories'}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
            isAccordionOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Desktop Header */}
        <div className="hidden md:flex p-4 border-b border-gray-800 items-center gap-2">
          <ListFilter className="w-5 h-5 text-[#e40876]" />
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>

        {/* Categories List - Mobile */}
        <div className={`md:hidden transition-all duration-200 ease-in-out ${
          isAccordionOpen ? 'max-h-[40vh]' : 'max-h-0'
        } overflow-y-auto scrollbar-hide`}>
          <div className="py-2 grid grid-cols-2 gap-1 p-1">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={{
                  id: category.id.toString(),
                  name: category.insert_language,
                  image: category.image
                }}
                isSelected={selectedCategory === category.id.toString()}
                onSelect={(id) => {
                  onCategorySelect(id);
                  setIsAccordionOpen(false);
                }}
              />
            ))}
          </div>
        </div>

        {/* Categories List - Desktop */}
        <div className="relative hidden md:block">
          {/* Scroll Gradient - Top */}
          <div className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#1e1e1e] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
            isScrolledToTop ? 'opacity-0' : 'opacity-100'
          }`} />

          <div 
            className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide"
            onScroll={handleScroll}
          >
            <div className="py-2 space-y-1 p-1">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={{
                    id: category.id.toString(),
                    name: category.insert_language,
                    image: category.image
                  }}
                  isSelected={selectedCategory === category.id.toString()}
                  onSelect={onCategorySelect}
                />
              ))}
            </div>
          </div>

          {/* Scroll Gradient - Bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#1e1e1e] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
            isScrolledToBottom ? 'opacity-0' : 'opacity-100'
          }`} />
        </div>
      </div>
    </div>
  );
};