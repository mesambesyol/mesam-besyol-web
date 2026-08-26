import React, { useState, useMemo } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import SectionTitle from '../components/SectionTitle';
import StaffCard from '../components/StaffCard';
import { STAFF_DATA } from '../data/staff';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedItem from '../components/AnimatedItem';
import MetaTags from '../components/MetaTags';
import { WhatsAppIcon, SparklesIcon } from '../constants/icons';

type FilterCategory = 'all' | 'management' | 'assistant' | 'reception';

const StaffPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const whatsappLink = `https://wa.me/905366549868`;

  const filteredStaff = useMemo(() => {
    if (activeCategory === 'all') {
      return [...STAFF_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return STAFF_DATA.filter(member => member.department === activeCategory);
  }, [activeCategory]);

  const categories: { id: FilterCategory; labelKey: string; count: number }[] = [
    { id: 'all', labelKey: 'staffPage.categories.all', count: STAFF_DATA.length },
    { id: 'management', labelKey: 'staffPage.categories.management', count: STAFF_DATA.filter(s => s.department === 'management').length },
    { id: 'assistant', labelKey: 'staffPage.categories.assistant', count: STAFF_DATA.filter(s => s.department === 'assistant').length },
    { id: 'reception', labelKey: 'staffPage.categories.reception', count: STAFF_DATA.filter(s => s.department === 'reception').length },
  ];

  return (
    <div className="bg-gradient-to-br from-brand-teal via-teal-900 to-brand-blue py-12 sm:py-16 overflow-hidden min-h-screen">
      <MetaTags page="staff" />
      <PageContainer>
        {/* Title & Introduction */}
        <AnimatedItem>
          <SectionTitle 
            theme="dark"
            title={t('staffPage.title')}
            subtitle={t('staffPage.subtitle')} 
          />
        </AnimatedItem>

        {/* Category Filters */}
        <AnimatedItem className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-md border ${
                activeCategory === cat.id
                  ? 'bg-white text-brand-blue shadow-lg scale-105 border-white'
                  : 'bg-white/10 text-sky-100 border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{t(cat.labelKey as any)}</span>
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[11px] ${
                activeCategory === cat.id ? 'bg-brand-blue/10 text-brand-blue' : 'bg-white/20 text-white'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </AnimatedItem>

        {/* Staff Members Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {filteredStaff.map((member, index) => (
              <AnimatedItem 
                key={member.id} 
                staggerIndex={index} 
                className="h-full"
              >
                <StaffCard member={member} />
              </AnimatedItem>
            ))}
          </div>
        ) : (
          <p className="text-center text-sky-200">{t('staffPage.noStaff')}</p>
        )}

        {/* Bottom CTA Banner */}
        <AnimatedItem className="mt-14 bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-semibold mb-4">
            <SparklesIcon className="w-4 h-4 text-amber-300" />
            <span>Mesam Beşyol Diş Polikliniği</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t('staffPage.bottomCtaTitle')}
          </h3>
          <p className="text-sky-100 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('staffPage.bottomCtaText')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-emerald-400/40 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-950/30 hover:-translate-y-0.5 active:scale-98 transition-all duration-200 cta-pulse"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t('buttons.whatsappAppointment')}</span>
            </a>
            <ReactRouterDom.Link 
              to="/hekimlerimiz" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white/20 text-white hover:bg-white/30 border border-white/40 backdrop-blur-md rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
              {t('buttons.allDoctors')}
            </ReactRouterDom.Link>
          </div>
        </AnimatedItem>
      </PageContainer>
    </div>
  );
};

export default StaffPage;
