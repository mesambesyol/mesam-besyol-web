import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BeforeAfterGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const autoDemoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    setIsUserInteracting(true);
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
    resetAutoDemoTimer();
  };
  
  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    resetAutoDemoTimer();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUserInteracting(true);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    setIsUserInteracting(true);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const resetAutoDemoTimer = () => {
    if (autoDemoTimerRef.current) clearTimeout(autoDemoTimerRef.current);
    autoDemoTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };
  
  // Auto-demonstration subtle wave motion when idle in viewport
  useEffect(() => {
    let startTime: number | null = null;
    let observer: IntersectionObserver | null = null;
    let isIntersecting = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // seconds

      if (!isUserInteracting && isIntersecting) {
        // Smooth sine oscillation between 38% and 62%
        const newPos = 50 + Math.sin(elapsed * 1.5) * 16;
        setSliderPosition(newPos);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting;
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (autoDemoTimerRef.current) clearTimeout(autoDemoTimerRef.current);
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isUserInteracting]);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden select-none group rounded-2xl border border-slate-100 shadow-2xl comparison-slider"
        style={{ '--position': `${sliderPosition}%` } as React.CSSProperties}
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={resetAutoDemoTimer}
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
          className="absolute inset-y-0 w-1 bg-white/90 cursor-ew-resize slider-handle shadow-md z-10"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-200/60 active:scale-95 transition-transform">
            <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l-4 4 4 4m8-8l4 4-4 4"></path></svg>
          </div>
        </div>

        {/* Subtle Live Demo Hint */}
        {!isUserInteracting && (
          <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20 pointer-events-none transition-opacity duration-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>Canlı Önizleme / Sürükleyin</span>
          </div>
        )}
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