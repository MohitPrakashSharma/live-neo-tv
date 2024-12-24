import React, { useState } from 'react';
import { CategoryList } from './CategoryList';
import { ChannelList } from './ChannelList';

export const ProgramGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('movies');

  const handleChannelSelect = (channelId: string) => {
    // Handle channel selection
    console.log('Selected channel:', channelId);
  };

  return (
    <div className="mt-[300px] flex">
      <CategoryList 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="flex-1 bg-[#1a1a1a]">
        <ChannelList 
          selectedCategory={selectedCategory}
          onChannelSelect={handleChannelSelect}
        />
      </div>
    </div>
  );
};