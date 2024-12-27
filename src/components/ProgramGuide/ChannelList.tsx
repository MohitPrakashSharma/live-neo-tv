import React from 'react';
import { useChannels } from '../../hooks/useChannels';
import { ChannelItem } from './ChannelItem';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';
import { ChannelItemSkeleton } from '../Skeletons/ChannelItemSkeleton';

interface ChannelListProps {
	selectedCategory: string;
	selectedChannel?: string;
	onChannelSelect: (id: string, name: string) => void;
	isExpanded: boolean;
	categoryName: string;
}

export const ChannelList = ({
	selectedCategory,
	selectedChannel,
	onChannelSelect,
	isExpanded,
	categoryName,
}: ChannelListProps) => {
	const { channels, loading, error, refetch } = useChannels(categoryName);

	if (loading) {
		return (
			<div className="flex-1 p-4">
				<ChannelItemSkeleton />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex-1 p-4">
				<ErrorMessage message={error} onRetry={refetch} />
			</div>
		);
	}

	if (channels.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center flex-1 p-8 text-gray-400 bg-[#262626] rounded-lg">
				{/* Icon */}
				<div className="mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-12 w-12 text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6-4v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6-4V7a2 2 0 012-2h2a2 2 0 012 2v2"
						/>
					</svg>
				</div>
				{/* Text */}
				<h3 className="text-lg font-semibold text-gray-300">
					No Channels Found
				</h3>
				<p className="mt-2 text-sm text-gray-400">
					Try selecting a different category or refreshing the page.
				</p>
			</div>
		);
	}


	return (
		<div
			className={`flex-1 overflow-y-auto transition-all duration-300 ${isExpanded ? 'max-h-[calc(100vh-100px)]' : 'max-h-[calc(100vh-500px)]'
				} scrollbar-hide`}
		>
			<div className="space-y-3 pb-8">
				{channels.map((channel) => (
					<ChannelItem
						key={channel.id}
						channel={channel}
						isSelected={channel.id === selectedChannel}
						onSelect={() => onChannelSelect(channel.id, channel.channel_name)}
					/>
				))}
			</div>
		</div>
	);
};
