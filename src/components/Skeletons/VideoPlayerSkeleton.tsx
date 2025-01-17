import React, { useEffect, useState } from 'react';

export const VideoPlayerSkeleton = () => {
    const [aspectRatio, setAspectRatio] = useState('16/9'); 

    const updateAspectRatio = () => {
        if (window.innerWidth >= 768) {
            setAspectRatio('32/9');  
        } else {
            setAspectRatio('16/9'); 
        }
    };

    useEffect(() => {
        updateAspectRatio();
        window.addEventListener('resize', updateAspectRatio);
        return () => window.removeEventListener('resize', updateAspectRatio);
    }, []);

    return (
        <div className="sticky top-16 left-0 right-0 w-full z-30">
            <div className="bg-black">
                <div
                    className="relative w-full bg-gray-800"
                    style={{ aspectRatio }}
                >
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#262626] py-1.5 px-2">
                <div className="container mx-auto px-4">
                    <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
