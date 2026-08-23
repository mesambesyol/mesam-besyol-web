
import React, { useRef, useEffect } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceCarouselProps {
  services: Service[];
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!services || services.length === 0) {
    return null;
  }

  // Triple items for seamless infinite auto-scroll and manual scrolling
  const scrollItems = [...services, ...services, ...services];

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

