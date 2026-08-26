
import React from 'react';
import PageContainer from '../components/PageContainer';
import SectionTitle from '../components/SectionTitle';
import * as ReactRouterDom from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedItem from '../components/AnimatedItem';
import MetaTags from '../components/MetaTags';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <MetaTags page="about" />
      <div className="bg-gradient-to-br from-brand-teal via-teal-900 to-brand-blue py-12 sm:py-16 overflow-hidden min-h-screen text-white">
        <PageContainer>
          <AnimatedItem>
            <SectionTitle theme="dark" title={t('aboutPage.title')} subtitle={t('aboutPage.subtitle')} />
          </AnimatedItem>
          
          <AnimatedItem className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="https://i.imgur.com/YlYkPs3.jpeg" 
                alt={t('aboutPage.clinicImageAlt1')}
                className="rounded-xl shadow-2xl object-cover w-full h-auto aspect-[4/3] border border-white/20"
                loading="lazy"
              />
            </div>
            <div className="text-sky-100 space-y-6">
              <div className="space-y-4 text-justify">
                <p>{t('aboutPage.introductionText1')}</p>
                <p>{t('aboutPage.introductionText2')}</p>
                <p className="font-semibold text-amber-300">{t('aboutPage.introductionText3')}</p>
              </div>

              <hr className="border-t border-white/20" />

              <div>
                <h3 className="text-2xl font-semibold text-white">{t('aboutPage.mission')}</h3>
                <p className="text-justify mt-2 text-sky-100">
                  {t('aboutPage.missionText')}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{t('aboutPage.vision')}</h3>
                <p className="text-justify mt-2 text-sky-100">
                  {t('aboutPage.visionText')}
                </p>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem className="space-y-8 text-sky-100">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">{t('aboutPage.values')}</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sky-100">
                <li>{t('aboutPage.valuePatientOriented')}</li>
                <li>{t('aboutPage.valueExpertise')}</li>
                <li>{t('aboutPage.valueTechnology')}</li>
                <li>{t('aboutPage.valueHygiene')}</li>
                <li>{t('aboutPage.valueEthical')}</li>
                <li>{t('aboutPage.valueContinuousImprovement')}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">{t('aboutPage.ourPhilosophy')}</h3>
              <p className="mb-6 text-justify text-sky-100">
                {t('aboutPage.ourPhilosophyIntro')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-white mb-2">{t('aboutPage.philosophyPersonalized')}</h4>
                      <p className="text-sm text-sky-200">{t('aboutPage.philosophyPersonalizedText')}</p>
                  </div>
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-white mb-2">{t('aboutPage.philosophyModernTech')}</h4>
                      <p className="text-sm text-sky-200">{t('aboutPage.philosophyModernTechText')}</p>
                  </div>
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-white mb-2">{t('aboutPage.philosophyExpertStaff')}</h4>
                      <p className="text-sm text-sky-200">{t('aboutPage.philosophyExpertStaffText')} <ReactRouterDom.Link to="/hekimlerimiz" className="text-amber-300 hover:underline">{t('aboutPage.meetOurTeamLink')}</ReactRouterDom.Link></p>
                  </div>
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-white mb-2">{t('aboutPage.philosophyComfortableEnv')}</h4>
                      <p className="text-sm text-sky-200">{t('aboutPage.philosophyComfortableEnvText')}</p>
                  </div>
              </div>
            </div>
          </AnimatedItem>

           <AnimatedItem className="mt-16 text-center">
              <img 
                src="https://i.imgur.com/EB1IW9r.jpeg" 
                alt={t('aboutPage.teamImageAlt2')}
                className="rounded-xl shadow-2xl mx-auto border border-white/20"
                loading="lazy"
              />
              <p className="mt-4 text-sky-200 italic">{t('aboutPage.teamImageCaption')}</p>
          </AnimatedItem>

        </PageContainer>
      </div>
    </>
  );
};

export default AboutPage;
