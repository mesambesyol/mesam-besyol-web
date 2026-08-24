
import React, { useState, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { Service } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  service: Service;
  isFeatured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isFeatured = false }) => {
  const { getLocalized, t } = useLanguage();
  const name = getLocalized(service.name);
  const description = getLocalized(service.description);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt: 6 degrees
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <ReactRouterDom.Link
      to={`/hizmetlerimiz/${service.id}`}
      className="block group h-full select-none"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col h-full transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-brand-blue/15"
      >
        {/* Dynamic Soft Light Glare Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            opacity: glarePosition.opacity,
          }}
        />

        {isFeatured ? (
          <div className="flex-shrink-0 h-48 w-full flex items-center justify-center bg-gradient-to-br from-brand-blue-light/60 to-brand-cyan-light/30 p-4 overflow-hidden relative">
            <div className="icon-bounce">
              {React.cloneElement(service.icon, { className: "w-16 h-16 text-brand-teal mb-2" })}
            </div>
          </div>
        ) : (
          <div className="h-48 overflow-hidden flex-shrink-0 relative">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" src={service.imageUrl} alt={name} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          {/* Title with flexible height to accommodate 2 lines gracefully without clipping */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[3.5rem] tracking-tight">
            {name}
          </h3>
          {/* Description with flexible height */}
          <p className="text-slate-600 text-sm mb-5 line-clamp-3 min-h-[4.5rem] leading-relaxed">
            {description}
          </p>
          <div className="mt-auto pt-2">
             <span className="inline-flex items-center justify-center text-center bg-slate-50 border border-slate-200/80 text-brand-blue font-semibold px-4 py-2.5 rounded-xl group-hover:bg-gradient-to-r group-hover:from-brand-teal group-hover:to-teal-600 group-hover:border-transparent group-hover:text-white group-hover:shadow-md group-hover:shadow-teal-500/20 transition-all duration-200 text-sm w-full">
              {isFeatured ? t('buttons.moreInfo') : t('buttons.viewDetails')}
            </span>
          </div>
        </div>
      </div>
    </ReactRouterDom.Link>
  );
};

export default ServiceCard;
