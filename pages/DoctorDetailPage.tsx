

import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { DOCTORS_DATA } from '../data/doctors';
import { UserCircleIcon, AcademicCapIcon, ClipboardDocumentListIcon, BriefcaseIcon, SparklesIcon, WhatsAppIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { DoctorDetailSection } from '../types';
import MetaTags from '../components/MetaTags';

const getSectionIcon = (iconKey?: DoctorDetailSection['icon']) => {
  const iconProps = { className: "w-7 h-7 text-brand-teal mr-4 flex-shrink-0" };
  switch (iconKey) {
    case 'academic': return <AcademicCapIcon {...iconProps} />;
    case 'clipboard': return <ClipboardDocumentListIcon {...iconProps} />;
    case 'briefcase': return <BriefcaseIcon {...iconProps} />;
    case 'sparkles': return <SparklesIcon {...iconProps} />;
    default: return null;
  }
};

const DoctorDetailPage: React.FC = () => {
  const { slug } = ReactRouterDom.useParams<{ slug: string }>();
  const { t, getLocalized } = useLanguage();
  
  const doctor = DOCTORS_DATA.find(d => d.id === slug);

  if (!doctor) {
    return (
      <PageContainer className="py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-blue mb-4">{t('doctorDetailPage.notFoundTitle')}</h1>
        <p className="text-gray-600 mb-6">{t('doctorDetailPage.notFoundText')}</p>
        <ReactRouterDom.Link 
          to="/hekimlerimiz"
          className="inline-flex items-center justify-center bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-7 py-3 rounded-xl shadow-md transition-all duration-200 font-semibold"
        >
          {t('doctorDetailPage.backToDoctors')}
        </ReactRouterDom.Link>
      </PageContainer>
    );
  }

  const title = getLocalized(doctor.title);
  const hasRealImage = doctor.imageUrl;

  return (
    <>
      <MetaTags page="doctorDetail" data={doctor} />
      <div className="bg-stone-100 py-12 sm:py-16">
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <ReactRouterDom.Link to="/hekimlerimiz" className="inline-flex items-center text-sm font-semibold text-brand-teal hover:text-brand-blue transition-colors">
                &larr; {t('doctorDetailPage.backToDoctors')}
              </ReactRouterDom.Link>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-x-12 gap-y-8">
              <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    {hasRealImage ? (
                      <img
                        className="w-full h-full object-cover object-top"
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <UserCircleIcon className="w-32 h-32 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">{doctor.name}</h1>
                    <p className="text-brand-teal font-medium mb-6">{title}</p>
                    <a 
                      href={`https://wa.me/905432420016?text=Merhaba,%20${encodeURIComponent(doctor.name)}%20için%20randevu%20almak%20istiyorum.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-semibold text-sm cta-pulse"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      {t('buttons.whatsappAppointment')}
                    </a>
                  </div>
                </div>
              </aside>

              <main className="lg:col-span-2">
                {doctor.details ? (
                  <>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 mb-8">
                      <p className="text-lg text-slate-700 leading-relaxed">{getLocalized(doctor.details.introduction)}</p>
                    </div>
                    <div className="space-y-8">
                      {doctor.details.sections.map((section, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                          <div className="p-6 sm:p-8">
                            <div className="flex items-center mb-4">
                              {getSectionIcon(section.icon)}
                              <h2 className="text-2xl font-bold text-slate-800">{getLocalized(section.title)}</h2>
                            </div>
                            <div
                              className="prose max-w-none text-slate-600 [&_ul]:pl-2 [&_li]:mb-1"
                              dangerouslySetInnerHTML={{ __html: getLocalized(section.content) }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8">
                    <p className="text-slate-700 leading-relaxed">{getLocalized(doctor.bio)}</p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default DoctorDetailPage;