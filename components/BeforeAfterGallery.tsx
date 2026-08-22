import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BeforeAfterGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };
  
  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  
  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };
  
  useEffect(() => {
    return () => {
      // Cleanup event listeners when component unmounts
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden select-none group rounded-2xl border border-slate-100 shadow-2xl comparison-slider"
        style={{ '--position': `${sliderPosition}%` } as React.CSSProperties}
      >
        <img
          src="https://i.imgur.com/trE8QJV.jpg"
          alt={t('homePage.beforeAlt')}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="https://i.imgur.com/57PAVKb.jpg"
          alt={t('homePage.afterAlt')}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover after-image"
        />
        <div 
          className="absolute inset-y-0 w-1 bg-white/90 cursor-ew-resize slider-handle shadow-md"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-200/60 active:scale-95 transition-transform">
            <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l-4 4 4 4m8-8l4 4-4 4"></path></svg>
          </div>
        </div>
      </div>

      {/* Case Info and Mandatory Legal Disclaimer (Yönetmelik Madde 7 / 1-k) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-2">
        <p className="text-xs sm:text-sm font-medium text-slate-700">
          {t('homePage.beforeAfterCaseInfo')}
        </p>
        <p className="text-xs text-amber-800/90 bg-amber-50 border border-amber-200/60 rounded-lg p-2.5 leading-relaxed">
          <span className="font-semibold">⚠️ Yasal Bilgilendirme: </span>
          {t('homePage.beforeAfterDisclaimer')}
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;