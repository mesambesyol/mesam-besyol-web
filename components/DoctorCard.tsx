

import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { Doctor } from '../types';
import { AcademicCapIcon, UserCircleIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { getLocalized, t } = useLanguage();
  const hasRealImage = doctor.imageUrl;
  
  const title = getLocalized(doctor.title);
  // Bio removed to simplify the card overlay
  
  const textShadowStyle = { textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' };

  return (
    <ReactRouterDom.Link 
      to={`/hekimlerimiz/${doctor.id}`} 
      className="block group"
      aria-label={`${t('buttons.viewProfile')} ${doctor.name}`}
    >
      <div className="relative bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-slate-900/20 group-hover:-translate-y-1.5 aspect-[3/4]">
        {/* Background Image */}
        <div className="absolute inset-0">
          {hasRealImage ? (
            <img
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              src={doctor.imageUrl}
              alt={doctor.name}
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
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight" style={textShadowStyle}>
              {doctor.name}
            </h3>
            <div className="flex items-center justify-center text-sm font-medium text-sky-200 mb-4" style={textShadowStyle}>
              <AcademicCapIcon className="w-4 h-4 mr-1.5 text-brand-cyan-light" />
              <span>{title}</span>
            </div>
            {/* Bio text removed for cleaner look */}
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