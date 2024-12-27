import React, { useState, useEffect, useRef } from 'react';
import { ListFilter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { useCategories } from '../../hooks/useCategories';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { ChannelListSkeleton } from '../Skeletons/ChannelListSkeleton';

interface CategoryListProps {
	selectedCategory: string;
	onCategorySelect: (id: string) => void;
	isExpanded: boolean;
}

export const CategoryList = ({
	selectedCategory,
	onCategorySelect,
	isExpanded
}: CategoryListProps) => {
	const { categories, loading, error } = useCategories();
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const { scrollRef, scrollLeft, scrollRight, canScrollLeft, canScrollRight } = useHorizontalScroll();
	const [isHovering, setIsHovering] = useState(false);

	// Auto-select first category if none is selected
	useEffect(() => {
		if (!loading && categories.length > 0 && !selectedCategory) {
			const firstCategory = categories[0];
			onCategorySelect(firstCategory.insert_language);
		}
	}, [categories, loading, selectedCategory, onCategorySelect]);

	// Find selected category by ID or language
	const selectedCategoryData = categories.find(c =>
		c.id.toString() === selectedCategory || c.insert_language === selectedCategory
	);

	if (loading) {
		return (
			<ChannelListSkeleton/>
		);
	}

	if (error) {
		return (
			<div className="w-full md:w-64 bg-[#1e1e1e] rounded-lg p-4 text-red-500">
				{error}
			</div>
		);
	}

	return (
		<div className={`w-full md:w-64  ${isExpanded ? 'md:sticky md:top-20' : ''
			} self-start`}>
			<div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
				{/* Mobile Accordion Header */}
				<button
					className="w-full md:hidden p-4 border-b border-gray-800 flex items-center justify-between"
					onClick={() => setIsAccordionOpen(!isAccordionOpen)}
				>
					<div className="flex items-center gap-2">
						<ListFilter className="w-5 h-5 text-[#e40876]" />
						<span className="text-lg font-semibold">
							{selectedCategoryData ? selectedCategoryData.insert_language : 'Categories'}
						</span>
					</div>
					<ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isAccordionOpen ? 'rotate-180' : ''
						}`} />
				</button>

				{/* Desktop Header */}
				<div className="hidden md:flex p-4 border-b border-gray-800 items-center gap-2">
					<ListFilter className="w-5 h-5 text-[#e40876]" />
					<h2 className="text-lg font-semibold">Categories</h2>
				</div>

				{/* Categories List */}
				<div
					className={`relative md:block ${isAccordionOpen ? 'block' : 'hidden'
						}`}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					{/* Horizontal Scroll Container for Mobile */}
					<div
						ref={scrollRef}
						className="md:hidden flex overflow-x-auto scrollbar-hide scroll-smooth gap-2 p-4"
					>
						{categories.map((category) => (
							<div key={category.id} className="flex-shrink-0">
								<CategoryItem
									category={{
										id: category.insert_language,
										name: category.insert_language,
										image: category.image
									}}
									isSelected={selectedCategory === category.id.toString() ||
										selectedCategory === category.insert_language}
									onSelect={(id) => {
										onCategorySelect(id);
										setIsAccordionOpen(false);
									}}
								/>
							</div>
						))}
					</div>

					{/* Vertical List for Desktop */}
					<div className="hidden md:block max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
						<div className="py-2 space-y-1 p-1">
							{categories.map((category) => (
								<CategoryItem
									key={category.id}
									category={{
										id: category.insert_language,
										name: category.insert_language,
										image: category.image
									}}
									isSelected={selectedCategory === category.id.toString() ||
										selectedCategory === category.insert_language}
									onSelect={(id) => {
										onCategorySelect(id);
										setIsAccordionOpen(false);
									}}
								/>
							))}
						</div>
					</div>

					{/* Mobile Scroll Buttons */}
					<div className="md:hidden">
						{canScrollLeft && (
							<button
								onClick={scrollLeft}
								className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-r-lg transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'
									}`}
								aria-label="Scroll left"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
						)}

						{canScrollRight && (
							<button
								onClick={scrollRight}
								className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-l-lg transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'
									}`}
								aria-label="Scroll right"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};