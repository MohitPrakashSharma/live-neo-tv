import React, { useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { useCategories } from '../../hooks/useCategories';
import { ChannelListSkeleton } from '../Skeletons/ChannelListSkeleton';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

export const CategoryList = ({
  selectedCategory,
  onCategorySelect
}: CategoryListProps) => {
  const { categories, loading, error } = useCategories();

  // Auto-select first category if none is selected
  useEffect(() => {
    if (!loading && categories.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];
      onCategorySelect(firstCategory.insert_language);
    }
  }, [categories, loading, selectedCategory, onCategorySelect]);

  // Find selected category by ID or language
  const selectedCategoryData = categories.find(
    (c) => c.id.toString() === selectedCategory || c.insert_language === selectedCategory
  );

  if (loading) {
    return <ChannelListSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full md:w-72 bg-[#1e1e1e] rounded-lg p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full md:w-72 self-start">
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:flex p-4 border-b border-gray-800 items-center gap-2">
          <ListFilter className="w-5 h-5 text-[#e40876]" />
          <h2 className="text-xl font-semibold">Categories</h2>
        </div>

        {/* Categories List */}
        <div className="hidden md:block max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="py-2 space-y-2 p-2">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={{
                  id: category.insert_language,
                  name: category.insert_language,
                  image: category.image
                }}
                isSelected={
                  selectedCategory === category.id.toString() ||
                  selectedCategory === category.insert_language
                }
                onSelect={(id) => {
                  onCategorySelect(id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Vertical List for Mobile */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-3">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0">
              <CategoryItem
                category={{
                  id: category.insert_language,
                  name: category.insert_language,
                  image: category.image
                }}
                isSelected={
                  selectedCategory === category.id.toString() ||
                  selectedCategory === category.insert_language
                }
                onSelect={(id) => {
                  onCategorySelect(id);
                }}
                imageSize="larger"
                textSize="larger"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
