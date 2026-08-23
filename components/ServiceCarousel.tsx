import React, { useEffect, useRef } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceCarouselProps {
  services: Service[];
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const isMouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!services || services.length === 0) {
    return null;
  }

  // Duplicate 3 times for seamless bidirectional infinite scrolling
  const triplicatedServices = [...services, ...services, ...services];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial position at middle set
    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0 && container.scrollLeft === 0) {
      container.scrollLeft = singleSetWidth;
      posRef.current = singleSetWidth;
    }

    let lastTime = performance.now();
    let animationFrameId: number;
    const speed = 40; // Pixels per second (smooth, comfortable auto-scroll)

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (container && !isInteractingRef.current) {
        const setWidth = container.scrollWidth / 3;
        if (setWidth > 0) {
          posRef.current += speed * dt;

          // Infinite wrap bounds
          if (posRef.current >= setWidth * 2) {
            posRef.current -= setWidth;
          } else if (posRef.current < setWidth * 0.3) {
            posRef.current += setWidth;
          }

          container.scrollLeft = posRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [services]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // Keep internal tracking float in sync with user scrolling
    posRef.current = container.scrollLeft;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
        posRef.current -= singleSetWidth;
      } else if (container.scrollLeft <= singleSetWidth * 0.2) {
        container.scrollLeft += singleSetWidth;
        posRef.current += singleSetWidth;
      }
    }
  };

  // Touch Handlers for Mobile
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    // Resume auto-scroll smoothly after user finishes swiping
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1000);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isMouseDownRef.current = true;
    isInteractingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!isMouseDownRef.current || !container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1000);
  };

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      handleMouseUp();
    } else {
      isInteractingRef.current = false;
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div 
      className="relative w-full py-4 overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle edge fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-teal-900/30 to-transparent z-10 hidden sm:block" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-brand-blue/40 to-transparent z-10 hidden sm:block" />

      {/* Interactive & Auto-Scrolling Track */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClickCapture={handleClickCapture}
        className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-4 sm:px-6 cursor-grab active:cursor-grabbing select-none no-scrollbar"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {triplicatedServices.map((service, index) => (
          <div
            key={`service-${service.id}-${index}`}
            className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0"
          >
            <ServiceCard service={service} isFeatured={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
