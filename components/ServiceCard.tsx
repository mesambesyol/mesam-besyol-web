
import React from 'react';
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

  return (
    <ReactRouterDom.Link
      to={`/hizmetlerimiz/${service.id}`}
      className="block group h-full"
    >
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-brand-blue/10 group-hover:-translate-y-1.5">
        {isFeatured ? (
          <div className="flex-shrink-0 h-48 w-full flex items-center justify-center bg-gradient-to-br from-brand-blue-light/60 to-brand-cyan-light/30 p-4 overflow-hidden">
            {React.cloneElement(service.icon, { className: "w-16 h-16 text-brand-teal mb-2 transition-transform duration-300 group-hover:scale-110" })}
          </div>
        ) : (
          <div className="h-48 overflow-hidden flex-shrink-0 relative">
            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={service.imageUrl} alt={name} loading="lazy" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          {/* Fixed height for title (approx 2 lines) to ensure alignment */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 h-14 overflow-hidden tracking-tight">
            {name}
          </h3>
          {/* Fixed height for description (approx 3-4 lines) to ensure alignment */}
          <p className="text-slate-600 text-sm mb-5 line-clamp-3 h-20 overflow-hidden leading-relaxed">
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
