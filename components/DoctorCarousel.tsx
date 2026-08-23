
import React, { useRef, useEffect } from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorCarouselProps {
  doctors: Doctor[];
}

const DoctorCarousel: React.FC<DoctorCarouselProps> = ({ doctors }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!doctors || doctors.length === 0) {
    return null;
  }

  // Triple items for seamless infinite auto-scroll and manual scrolling
  const scrollItems = [...doctors, ...doctors, ...doctors];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 1.0; // Smooth auto-scroll speed
    let exactScroll = container.scrollLeft;

    const step = () => {
      if (!isInteracting.current && container) {
        exactScroll += speed;
        container.scrollLeft = exactScroll;

        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          exactScroll -= singleSetWidth;
          container.scrollLeft = exactScroll;
        } else if (container.scrollLeft <= 0) {
          exactScroll += singleSetWidth;
          container.scrollLeft = exactScroll;
        }
      } else if (container) {
        exactScroll = container.scrollLeft;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleUserAction = () => {
    isInteracting.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2500);
  };

  return (
    <div className="relative w-full group">
      {/* Auto-scrolling & Touch swipeable container */}
      <div 
        ref={scrollRef}
        onTouchStart={handleUserAction}
        onTouchMove={handleUserAction}
        onWheel={handleUserAction}
        onMouseDown={handleUserAction}
        onMouseEnter={handleUserAction}
        onMouseLeave={() => {
          if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
          resumeTimeoutRef.current = setTimeout(() => {
            isInteracting.current = false;
          }, 1000);
        }}
        className="overflow-x-auto pb-6 pt-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
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
