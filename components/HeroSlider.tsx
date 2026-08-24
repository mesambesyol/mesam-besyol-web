

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSlideItem, CtaButtonConfig } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeftIcon, ChevronRightIcon } from '../constants/icons';

interface HeroSliderProps {
  slides: HeroSlideItem[];
  autoPlayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, autoPlayInterval = 5500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  const navigate = ReactRouterDom.useNavigate();
  const autoPlayTimerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = window.setTimeout(goToNext, autoPlayInterval);
  }, [autoPlayInterval, goToNext]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, resetAutoPlay]);
  
  const handleMouseEnter = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    resetAutoPlay();
  };
  
  const handleCtaClick = (cta: CtaButtonConfig) => {
    if (cta.path.startsWith('http')) {
      window.open(cta.path, '_blank', 'noopener,noreferrer');
      return;
    }
    if (cta.scrollToId) {
      navigate(cta.path, { state: { scrollToId: cta.scrollToId } });
    } else {
      navigate(cta.path);
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;
    const minSwipeDistance = 45;

    if (swipeDistance > minSwipeDistance) {
      goToPrev();
    } else if (swipeDistance < -minSwipeDistance) {
      goToNext();
    }
    
    touchStartX.current = null;
    resetAutoPlay();
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  const getButtonClasses = (variant: CtaButtonConfig['variant']) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-3.5 sm:px-8 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] cursor-pointer shadow-lg";
    switch (variant) {
      case 'primary':
        return `${baseClasses} border border-white/40 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md hover:shadow-cyan-500/20 btn-shimmer`;
      case 'secondary':
        return `${baseClasses} border border-teal-400/40 text-white bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-teal-900/40 hover:shadow-teal-500/30 btn-shimmer`;
      case 'outline':
        return `${baseClasses} border border-white/60 text-white bg-black/30 hover:bg-white/20 backdrop-blur-md`;
      default:
        return baseClasses;
    }
  };

  return (
    <div 
      className="relative w-full h-[64vh] sm:h-[72vh] md:h-[80vh] lg:h-[74vh] overflow-hidden select-none bg-slate-950"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('heroSlider.slide1.title')}
    >
      {/* Background Images Cross-Fade with Subtle Ambient Zoom */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={t(slide.titleKey as any)}
              className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              // @ts-ignore
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-900/40" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
          </div>
        );
      })}

      {/* Dynamic Animated Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* Slide Title */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-md max-w-4xl"
            >
              {t(currentSlide.titleKey as any)}
            </motion.h1>

            {/* Slide Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-lg mx-auto text-base text-sky-100 sm:text-lg md:text-xl md:mt-6 md:max-w-2xl drop-shadow leading-relaxed"
            >
              {t(currentSlide.subtitleKey as any)}
            </motion.p>

            {/* Slide CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 w-full max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
                {currentSlide.cta1 && (
                  <button
                    onClick={() => handleCtaClick(currentSlide.cta1!)}
                    className={getButtonClasses(currentSlide.cta1.variant)}
                  >
                    {t(currentSlide.cta1.textKey as any)}
                  </button>
                )}
                {currentSlide.cta2 && (
                  <button
                    onClick={() => handleCtaClick(currentSlide.cta2!)}
                    className={getButtonClasses(currentSlide.cta2.variant)}
                  >
                    {t(currentSlide.cta2.textKey as any)}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-3 sm:left-6 z-30 transform -translate-y-1/2 bg-black/35 hover:bg-black/65 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan-light"
        aria-label={t('heroSlider.prevArrow')}
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 sm:right-6 z-30 transform -translate-y-1/2 bg-black/35 hover:bg-black/65 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan-light"
        aria-label={t('heroSlider.nextArrow')}
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      {/* Dot Navigation & Progress Indicators */}
      <div className="absolute bottom-5 sm:bottom-7 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2 sm:space-x-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
        {slides.map((_, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-400 ease-out rounded-full cursor-pointer
                ${isActive ? 'w-7 sm:w-9 h-2 sm:h-2.5 bg-gradient-to-r from-brand-cyan to-brand-cyan-light shadow-sm shadow-cyan-400/50' : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70'}
              `}
              aria-label={`${t('heroSlider.goToSlide')} ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;
