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
      // style={{ 
      //   zIndex: isExpanded ? 40 : 1,
      //   transform: `translateY(${isLocked ? '0' : 'translateY(0)'})`,
      // }}
    >
      <div className={`container-fluid mx-auto px-4  ${
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