
import React from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceCarouselProps {
  services: Service[];
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return null;
  }

  // Duplicate the list to ensure seamless looping for the animation on desktop
  const scrollItems = [...services, ...services];

  return (
    <div className="relative w-full group">
      
      {/* Container to handle overflow. On mobile it scrolls naturally, on desktop it hides overflow. */}
      <div className="overflow-x-auto md:overflow-hidden pb-4 md:pb-0">
         {/* Inner container. Flex layout. Width max-content ensures items don't wrap on mobile. 
             md:animate-scroll enables the infinite animation only on desktop. */}
         <div className="flex w-max md:animate-scroll">
            {scrollItems.map((service, index) => (
              <div
                key={`service-${service.id}-${index}`}
                className="flex-shrink-0 w-80 sm:w-96 px-4 h-full"
              >
                <div className="h-full">
                  <ServiceCard service={service} isFeatured={false} />
                </div>
              </div>
            ))}
         </div>
      </div>
      
      {/* Fade effects on the edges, only visible on desktop to not obscure scroll on mobile */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-teal to-transparent z-10"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-blue to-transparent z-10"></div>
    </div>
  );
};

export default ServiceCarousel;
