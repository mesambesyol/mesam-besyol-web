
import React, { useRef, useEffect } from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorCarouselProps {
  doctors: Doctor[];
}

const DoctorCarousel: React.FC<DoctorCarouselProps> = ({ doctors }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  if (!doctors || doctors.length === 0) {
    return null;
  }

  // Triple items for seamless infinite auto-scroll
  const scrollItems = [...doctors, ...doctors, ...doctors];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.8; // Smooth auto-scroll speed
    
    // Initial scroll position to the middle set
    if (container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 3;
    }
    let exactScroll = container.scrollLeft;

    const step = () => {
      if (container) {
        if (!isDragging.current) {
          exactScroll += speed;
          container.scrollLeft = exactScroll;
        } else {
          // Keep exactScroll synced while user is manually dragging/touching
          exactScroll = container.scrollLeft;
        }

        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          exactScroll -= singleSetWidth;
          container.scrollLeft = exactScroll;
        } else if (container.scrollLeft <= 0) {
          exactScroll += singleSetWidth;
          container.scrollLeft = exactScroll;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Auto-scrolling & touch/swipeable container */}
      <div 
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        className="overflow-x-auto pb-6 pt-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex w-max gap-4 px-2">
          {scrollItems.map((doctor, index) => (
            <div
              key={`${doctor.id}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80"
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;


