import React from 'react';

export const PopularChannelsSkeleton = () => {
	return (
		<>
			<div className="flex items-center justify-center gap-2 mb-4 animate-pulse">
				{/* Icon Placeholder */}
				<div className="w-5 h-5 md:w-6 md:h-6 bg-gray-700 rounded-full"></div>
				{/* Text Placeholder */}
				<div className="h-5 md:h-6 bg-gray-700 rounded w-32 md:w-40"></div>
			</div>
			<div className="flex justify-center">
				<div className="grid grid-flow-col auto-cols-[80px] sm:auto-cols-[100px] md:auto-cols-[140px] lg:auto-cols-[160px] gap-2 md:gap-3">
					{Array.from({ length: 7 }).map((_, index) => (
						<div key={index} className="animate-pulse flex flex-col items-center gap-2">
							{/* Placeholder for channel image */}
							<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gray-700 rounded-md"></div>
							{/* Placeholder for channel title */}
							{/* <div className="w-16 sm:w-20 md:w-28 h-4 bg-gray-700 rounded"></div> */}
						</div>
					))}
				</div>
			</div>
		</>
	);
};
