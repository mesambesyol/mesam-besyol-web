

import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { WhatsAppIcon } from '../constants/icons';

const ServicePageCTA: React.FC = () => {
    const { t } = useLanguage();
    const whatsappLink = `https://wa.me/905366549868`;

    return (
        <div className="bg-gradient-to-br from-brand-blue to-sky-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    <span className="block">{t('serviceDetailPage.ctaTitle')}</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-sky-100 max-w-2xl mx-auto">
                    {t('serviceDetailPage.ctaSubtitle')}
                </p>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <ReactRouterDom.Link
                        to="/randevu"
                        className="inline-flex items-center justify-center px-7 py-3.5 border border-white/80 text-base font-semibold rounded-xl text-brand-blue bg-white hover:bg-sky-50 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        {t('buttons.appointment')}
                    </ReactRouterDom.Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-emerald-400/30 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        {t('header.whatsappLine')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServicePageCTA;
