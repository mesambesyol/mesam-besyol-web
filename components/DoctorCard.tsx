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
  const textShadowStyle = { textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' };

  return (
    <ReactRouterDom.Link 
      to={`/hekimlerimiz/${doctor.id}`} 
      className="block group select-none h-full"
      aria-label={`${t('buttons.viewProfile')} ${doctor.name}`}
    >
      <div className="relative bg-white rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-xl hover:shadow-slate-900/20 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 aspect-[3/4]">
        {/* Background Image */}
        <div className="absolute inset-0">
          {hasRealImage ? (
            <img
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
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

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none" />

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-center z-10">
          <h3 className="text-lg font-bold text-white mb-1 tracking-tight" style={textShadowStyle}>
            {doctor.name}
          </h3>
          <div className="flex items-center justify-center text-xs font-medium text-sky-200 mb-3.5" style={textShadowStyle}>
            <AcademicCapIcon className="w-3.5 h-3.5 mr-1.5 text-brand-cyan-light" />
            <span>{title}</span>
          </div>
          <div>
            <span className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-xl group-hover:bg-white group-hover:border-white group-hover:text-brand-blue group-hover:shadow-md transition-all duration-200 text-xs font-semibold w-full">
              {t('buttons.viewProfile')}
            </span>
          </div>
        </div>
      </div>
    </ReactRouterDom.Link>
  );
};

export default DoctorCard;
