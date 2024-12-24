import { useEffect, useRef, useState } from 'react';

export const useProgramGuideScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const triggerPoint = rect.top + window.scrollY - 64; // Header height offset
      const videoPlayerHeight = 400; // Video player height

      // Check scroll direction
      const isScrollingDown = scrollTop > lastScrollPosition.current;
      lastScrollPosition.current = scrollTop;

      if (scrollTop >= triggerPoint - videoPlayerHeight && isScrollingDown) {
        setIsExpanded(true);
        if (scrollTop >= triggerPoint + 100) {
          setIsLocked(true);
          document.body.classList.add('scroll-locked');
        }
      } else if (scrollTop < triggerPoint - videoPlayerHeight || !isScrollingDown) {
        // Reset when scrolling up or above trigger point
        setIsExpanded(false);
        setIsLocked(false);
        document.body.classList.remove('scroll-locked');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  return { containerRef, isExpanded, isLocked };
};