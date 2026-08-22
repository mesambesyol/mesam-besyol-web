
import React from 'react';
import { MoonIcon, PhoneIcon, ClockIcon, ShieldCheckIcon } from '../constants/icons'; 
import PageContainer from './PageContainer';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NightPatientCounter: React.FC = () => {
  const { t } = useLanguage();
  const { ref } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-slate-900 via-brand-blue-dark to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <PageContainer className="relative z-10 text-center">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mb-6 shadow-inner">
            <MoonIcon 
              className="w-9 h-9 text-sky-300" 
              aria-label={t('homePage.moonIconAlt')} 
            />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-sky-100 mb-4 tracking-tight">
            {t('homePage.nightCounterTitle')}
          </h2>
          
          <p className="text-sky-200 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
            {t('homePage.nightCounterSub')}
          </p>

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center justify-center space-x-3">
              <ClockIcon className="w-6 h-6 text-sky-400 flex-shrink-0" />
              <span className="text-sm font-medium text-sky-100">{t('homePage.nightCounterBadge1')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center justify-center space-x-3">
              <ShieldCheckIcon className="w-6 h-6 text-sky-400 flex-shrink-0" />
              <span className="text-sm font-medium text-sky-100">{t('homePage.nightCounterBadge2')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center justify-center space-x-3">
              <MoonIcon className="w-6 h-6 text-sky-400 flex-shrink-0" />
              <span className="text-sm font-medium text-sky-100">{t('homePage.nightCounterBadge3')}</span>
            </div>
          </div>

          {/* Emergency Call Box */}
          <div className="bg-sky-950/60 border border-sky-400/30 px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-xl">
            <span className="text-sm text-sky-200 font-medium">{t('homePage.nightCounterCall')}</span>
            <a 
              href="tel:+905366549868"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-cyan hover:bg-brand-cyan-dark text-slate-900 font-semibold rounded-xl transition-all shadow-md hover:shadow-cyan-500/20 hover:scale-105"
            >
              <PhoneIcon className="w-5 h-5 text-slate-900" />
              <span>0536 654 98 68</span>
            </a>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default NightPatientCounter;