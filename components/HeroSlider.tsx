

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { HeroSlideItem, CtaButtonConfig } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeftIcon, ChevronRightIcon } from '../constants/icons';

interface HeroSliderProps {
  slides: HeroSlideItem[];
  autoPlayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
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
    
    // Animate text on slide change
    setIsTextVisible(false);
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 150);

    return () => {
      clearTimeout(timer);
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
    const minSwipeDistance = 50; // Min distance for a swipe to be registered

    if (swipeDistance > minSwipeDistance) {
      goToPrev();
    } else if (swipeDistance < -minSwipeDistance) {
      goToNext();
    }
    
    touchStartX.current = null;
    resetAutoPlay();
  };

  if (!slides || slides.length === 0) {
    return null; // Or a fallback UI
  }

  const getButtonClasses = (variant: CtaButtonConfig['variant']) => {
    const baseClasses = "flex items-center justify-center px-6 py-3.5 sm:px-8 text-base font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98]";
    switch (variant) {
      case 'primary':
        return `${baseClasses} border border-white/40 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-xl btn-shimmer`;
      case 'secondary':
        return `${baseClasses} border border-teal-400/40 text-white bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-900/30 hover:shadow-xl hover:shadow-teal-500/20 btn-shimmer`;
      case 'outline':
        return `${baseClasses} border border-white/60 text-white bg-black/20 hover:bg-white/15 backdrop-blur-sm shadow-md hover:shadow-lg`;
      default:
        return "";
    }
  };

  return (
    <div 
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[70vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('heroSlider.slide1.title')}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0 bg-slate-900">
            <img
              src={slide.imageUrl}
              alt={t(slide.titleKey as any)}
              className="w-full h-full object-cover transition-opacity duration-700 ease-out"
              loading={index === 0 ? "eager" : "lazy"}
              // @ts-ignore
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8 hero-text-container ${isTextVisible ? 'visible' : ''}`}>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t(slide.titleKey as any)}
              </h1>
              <p className="mt-4 max-w-md mx-auto text-lg text-sky-100 sm:text-xl md:mt-6 md:max-w-2xl">
                {t(slide.subtitleKey as any)}
              </p>
              <div className="mt-8 sm:mt-10 w-full max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                  {slide.cta1 && (
                     <button
                        onClick={() => handleCtaClick(slide.cta1!)}
                        className={getButtonClasses(slide.cta1.variant)}
                      >
                        {t(slide.cta1.textKey as any)}
                      </button>
                  )}
                  {slide.cta2 && (
                     <button
                        onClick={() => handleCtaClick(slide.cta2!)}
                        className={getButtonClasses(slide.cta2.variant)}
                      >
                        {t(slide.cta2.textKey as any)}
                      </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => { goToPrev(); }}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl border border-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-lg"
        aria-label={t('heroSlider.prevArrow')}
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>
      <button
        onClick={() => { goToNext(); }}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl border border-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-lg"
        aria-label={t('heroSlider.nextArrow')}
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 sm:space-x-3 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { goToSlide(index); }}
            className={`transition-all duration-300 ease-in-out rounded-full
              ${currentIndex === index ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-brand-cyan-light' : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'}
            `}
            aria-label={`${t('heroSlider.goToSlide')} ${index + 1}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;