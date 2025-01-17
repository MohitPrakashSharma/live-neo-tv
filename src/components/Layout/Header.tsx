import React, { useState } from 'react';
import { Home, Tv, PlaySquare, User, Menu } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { HeaderSkeleton } from '../Skeletons/HeaderSkeleton';

export const Header = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handlePlayStore = () => {
		window.open('https://play.google.com/store/apps/details?id=com.neotv.app', '_blank');
	};

	// Prevent body scroll when menu is open
	React.useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMenuOpen]);

	React.useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return (
			<HeaderSkeleton />
		)
	}

	return (
		<>
			<header className="fixed top-0 left-0 right-0 bg-black text-white z-40">
				<div className="container-fluid mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link to="/" className="flex items-center">
							<img
								src="https://neotvapp.com/wp-content/uploads/2024/09/logo.svg"
								alt="NeoTV+"
								className="h-8 w-auto"
							/>
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						className="md:hidden relative z-[100]"
						onClick={() => setIsMenuOpen(true)}
						aria-label="Open menu"
					>
						<Menu className="w-6 h-6" />
					</button>

					{/* Desktop navigation */}
					<div className="hidden md:flex items-center gap-4">
						<Link to="/" className="">
							<IconButton icon={Home} label="Home" showLabel />
						</Link>
						<IconButton icon={Tv} label="Live TV" active showLabel />
						<IconButton
							icon={PlaySquare}
							label="Get Mobile App"
							showLabel
							onClick={handlePlayStore}
						/>
						<a 
  href="https://myaccount.neotvapp.com/" 
  target="_blank" 
  rel="noopener noreferrer"
  style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
>
  <IconButton 
    icon={User} 
    label="My Account" 
    showLabel 
  />
</a>
					</div>
				</div>
			</header>

			{/* Mobile Menu Modal */}
			<MobileMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				onPlayStore={handlePlayStore}
			/>
		</>
	);
};