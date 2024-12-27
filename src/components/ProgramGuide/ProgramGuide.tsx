import React, { useEffect } from 'react';
import { CategoryList } from './CategoryList';
import { ChannelList } from './ChannelList';
import { useProgramGuideScroll } from '../../hooks/useProgramGuideScroll';
import { useCategories } from '../../hooks/useCategories';

interface ProgramGuideProps {
  selectedCategory: string;
  selectedChannel?: string;
  onCategorySelect: (category: string) => void;
  onChannelSelect: (channel: string, name: string) => void;
}

export const ProgramGuide = ({
  selectedCategory,
  selectedChannel,
  onCategorySelect,
  onChannelSelect
}: ProgramGuideProps) => {
  const { containerRef, isExpanded, isLocked } = useProgramGuideScroll();
  const { categories, loading, initialCategory } = useCategories();

  useEffect(() => {
    if (!loading && categories.length > 0 && !selectedCategory) {
      onCategorySelect(categories[0].insert_language);
    }
  }, [categories, loading, selectedCategory, onCategorySelect]);

  const selectedCategoryData = categories.find(c => 
    c.id.toString() === selectedCategory || c.insert_language === selectedCategory
  );
  const categoryName = selectedCategoryData?.insert_language || initialCategory;

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'fixed top-[264px] md:top-[284px] lg:top-[324px] left-0 right-0 bottom-0 bg-[#1a1a1a]' : ''
      }`}
      style={{ 
        zIndex: isExpanded ? 40 : 1,
        transform: `translateY(${isLocked ? '0' : 'translateY(0)'})`,
      }}
    >
      <div className={`container-fluid mx-auto px-4 transition-all duration-300 ${
        isExpanded ? 'max-w-full md:max-w-[90%]' : ''
      }`}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <CategoryList
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
            isExpanded={isExpanded}
          />
          <ChannelList
            key={categoryName}
            selectedCategory={selectedCategory}
            selectedChannel={selectedChannel}
            onChannelSelect={onChannelSelect}
            isExpanded={isExpanded}
            categoryName={categoryName}
          />
        </div>
      </div>
    </div>
  );
};