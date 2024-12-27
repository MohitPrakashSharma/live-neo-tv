import React from 'react';

export const ChannelItemSkeleton = () => {
	return (
		<div className="space-y-3">
			{Array.from({ length: 7 }).map((_, index) => (
				<div
					key={index}
					className="animate-pulse flex items-center gap-4 p-4 bg-[#262626] rounded-lg"
				>
					{/* Skeleton for the channel thumbnail */}
					<div className="w-24 h-16 bg-gray-700 rounded"></div>
					{/* Skeleton for the channel text */}
					<div className="flex flex-col gap-2 flex-1">
						<div className="h-4 w-3/4 bg-gray-700 rounded"></div>
						<div className="h-4 w-1/2 bg-gray-700 rounded"></div>
					</div>
				</div>
			))}
		</div>
	);
};
