
import React, { useRef, useEffect } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceCarouselProps {
  services: Service[];
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  if (!services || services.length === 0) {
    return null;
  }

  // Triple items for seamless infinite auto-scroll
  const scrollItems = [...services, ...services, ...services];

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
    if (scrollRef.current) {
      exactScrollSync();
    }
  };

  const exactScrollSync = () => {
    if (scrollRef.current) {
      // sync exactScroll with current container position
    }
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
            {scrollItems.map((service, index) => (
              <div
                key={`service-${service.id}-${index}`}
                className="flex-shrink-0 w-80 sm:w-96 h-full"
              >
                <div className="h-full">
                  <ServiceCard service={service} isFeatured={false} />
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;



