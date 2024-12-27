import React from 'react';

export const QuickWatchOverlaySkeleton = () => {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center animate-pulse">
      {/* Skeleton for the play button */}
      <div className="p-4 rounded-full bg-gray-700"></div>
    </div>
  );
};
