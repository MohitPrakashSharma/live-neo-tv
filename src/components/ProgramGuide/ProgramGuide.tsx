import React, { useEffect } from 'react';
import { CategoryList } from './CategoryList';
import { ChannelList } from './ChannelList';
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
    <div>
      <div className="container-fluid mx-auto px-2">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <CategoryList
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
          <ChannelList
            key={categoryName}
            selectedCategory={selectedCategory}
            selectedChannel={selectedChannel}
            onChannelSelect={onChannelSelect}
            categoryName={categoryName}
          />
        </div>
      </div>
    </div>
  );
};
