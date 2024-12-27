import React from 'react';

export const ChannelListSkeleton = () => {
    return (
        <div className="w-full md:w-64 bg-[#1e1e1e] rounded-lg p-4">
            <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <div key={n} className="h-10 bg-gray-700 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
