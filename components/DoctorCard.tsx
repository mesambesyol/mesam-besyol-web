

import React, { useState, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { Doctor } from '../types';
import { AcademicCapIcon, UserCircleIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { getLocalized, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const hasRealImage = doctor.imageUrl;
  
  const title = getLocalized(doctor.title);
  const textShadowStyle = { textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' };

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
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.2 });
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
      to={`/hekimlerimiz/${doctor.id}`} 
      className="block group select-none"
      aria-label={`${t('buttons.viewProfile')} ${doctor.name}`}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-slate-900/25 aspect-[3/4]"
      >
        {/* Dynamic Soft Light Glare Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
            opacity: glarePosition.opacity,
          }}
        />

        {/* Background Image */}
        <div className="absolute inset-0">
          {hasRealImage && !imageError ? (
            <img
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              src={doctor.imageUrl}
              alt={doctor.name}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <UserCircleIcon className="w-24 h-24 text-gray-400" /> 
            </div>
          )}
        </div>

        {/* Gradient Overlay - Reduced height since bio is gone */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none"></div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-center z-10">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight" style={textShadowStyle}>
              {doctor.name}
            </h3>
            <div className="flex items-center justify-center text-sm font-medium text-sky-200 mb-4" style={textShadowStyle}>
              <AcademicCapIcon className="w-4 h-4 mr-1.5 text-brand-cyan-light icon-bounce" />
              <span>{title}</span>
            </div>
            <div>
              <span className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2.5 rounded-xl group-hover:bg-white group-hover:border-white group-hover:text-brand-blue group-hover:shadow-lg transition-all duration-200 text-sm font-semibold w-full">
                {t('buttons.viewProfile')}
              </span>
            </div>
        </div>
      </div>
    </ReactRouterDom.Link>
  );
};

export default DoctorCard;