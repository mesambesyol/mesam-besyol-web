import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { Service } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import ProgressiveImage from './ProgressiveImage';

interface ServiceCardProps {
  service: Service;
  isFeatured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isFeatured = false }) => {
  const { getLocalized, t } = useLanguage();
  const name = getLocalized(service.name);
  const description = getLocalized(service.description);

  return (
    <ReactRouterDom.Link
      to={`/hizmetlerimiz/${service.id}`}
      className="block group h-full select-none"
    >
      <div className="relative bg-white rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 overflow-hidden flex flex-col h-full transition-all duration-300 ease-out hover:-translate-y-1.5">
        {isFeatured ? (
          <div className="flex-shrink-0 h-48 w-full flex items-center justify-center bg-gradient-to-br from-brand-blue-light/60 to-brand-cyan-light/30 p-4 overflow-hidden relative">
            <div className="transition-transform duration-300 group-hover:scale-110">
              {React.cloneElement(service.icon, { className: "w-16 h-16 text-brand-teal mb-2" })}
            </div>
          </div>
        ) : (
          <div className="h-48 overflow-hidden flex-shrink-0 relative">
            <ProgressiveImage 
              src={service.imageUrl} 
              alt={name}
              containerClassName="w-full h-full"
              className="transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[3.25rem] tracking-tight">
            {name}
          </h3>
          <p className="text-slate-600 text-sm mb-5 line-clamp-3 min-h-[4rem] leading-relaxed">
            {description}
          </p>
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center justify-center text-center bg-slate-50 border border-slate-200/80 text-brand-blue font-semibold px-4 py-2.5 rounded-xl group-hover:bg-brand-teal group-hover:border-brand-teal group-hover:text-white group-hover:shadow-md group-hover:shadow-teal-500/20 transition-all duration-200 text-sm w-full">
              {isFeatured ? t('buttons.moreInfo') : t('buttons.viewDetails')}
            </span>
          </div>
        </div>
      </div>
    </ReactRouterDom.Link>
  );
};

export default ServiceCard;
