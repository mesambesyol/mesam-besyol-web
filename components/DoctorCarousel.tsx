
import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorCarouselProps {
  doctors: Doctor[];
}

const DoctorCarousel: React.FC<DoctorCarouselProps> = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  // Duplicate the list to ensure seamless looping on desktop
  const scrollItems = [...doctors, ...doctors];

  return (
    <div className="relative w-full group">
      {/* 
        On mobile: overflow-x-auto allows native swiping.
        On desktop: overflow-hidden + animate-scroll creates infinite loop.
      */}
      <div className="overflow-x-auto md:overflow-hidden pb-4 md:pb-0">
        <div className="flex w-max md:animate-scroll">
          {scrollItems.map((doctor, index) => (
            <div
              key={`${doctor.id}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80 px-4"
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Fade effects on the edges (hidden on mobile to not obstruct scrolling area) */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-stone-100 to-transparent z-10"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-stone-100 to-transparent z-10"></div>
    </div>
  );
};

export default DoctorCarousel;
