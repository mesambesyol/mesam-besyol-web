
import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import PageContainer from '../components/PageContainer';
import SectionTitle from '../components/SectionTitle';
import BlogPostCard from '../components/BlogPostCard';
import DoctorCarousel from '../components/DoctorCarousel';
import ServiceCarousel from '../components/ServiceCarousel';
import { SERVICES_DATA } from '../data/services';
import { BLOG_POSTS_DATA } from '../data/blog';
import { DOCTORS_DATA } from '../data/doctors';
import { HERO_SLIDES_DATA } from '../data/hero';
import { useLanguage } from '../contexts/LanguageContext';
import NightPatientCounter from '../components/NightPatientCounter';
import AnimatedItem from '../components/AnimatedItem';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import FaqSection from '../components/FaqSection';
import MetaTags from '../components/MetaTags';
import InstagramFeed from '../components/InstagramFeed';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const location = ReactRouterDom.useLocation();
  // We use all services for the carousel now, instead of just a slice
  const allServices = SERVICES_DATA;
  const latestPosts = BLOG_POSTS_DATA.slice(0, 3);
  const featuredDoctors = DOCTORS_DATA;

  React.useEffect(() => {
    const state = location.state as { scrollToId?: string } | null;
    if (state?.scrollToId) {
      const element = document.getElementById(state.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  return (
    <>
      <MetaTags page="home" />
      <HeroSlider slides={HERO_SLIDES_DATA} />

      <AnimatedItem as="section" className="py-16 bg-white overflow-hidden relative">
        {/* Floating Organic Blobs Background */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-brand-cyan-light/30 rounded-full blur-3xl animate-blob-1" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-brand-blue-pastel/25 rounded-full blur-3xl animate-blob-2" />

        <PageContainer className="relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal/30 to-brand-blue/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition duration-500" />
              <img 
                src="https://i.imgur.com/YlYkPs3.jpeg" 
                alt={t('homePage.teamImageAlt')}
                className="relative rounded-2xl shadow-xl w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <SectionTitle title={t('homePage.aboutOurClinicTitle')} className="text-left mb-6" />
              <p className="text-slate-600 mb-4 leading-relaxed">
                {t('homePage.aboutSummary1')}
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('homePage.aboutSummary2')}
              </p>
              <ReactRouterDom.Link
                to="/hakkimizda"
                className="inline-flex items-center justify-center bg-gradient-to-r from-brand-blue to-sky-700 hover:from-brand-blue hover:to-sky-800 text-white px-7 py-3.5 rounded-xl shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-semibold text-sm btn-shimmer"
              >
                {t('buttons.moreInfo')}
              </ReactRouterDom.Link>
            </div>
          </div>
        </PageContainer>
      </AnimatedItem>
      
      <AnimatedItem as="section" className="py-16 bg-stone-100 overflow-hidden">
        <PageContainer>
          <SectionTitle title={t('homePage.featuredDoctorsTitle')} />
          <DoctorCarousel doctors={featuredDoctors} />
          <div className="text-center mt-12">
            <ReactRouterDom.Link
              to="/hekimlerimiz"
              className="inline-flex items-center justify-center bg-gradient-to-r from-brand-blue to-sky-700 hover:from-brand-blue hover:to-sky-800 text-white px-8 py-3.5 rounded-xl shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-semibold"
            >
              {t('buttons.allDoctors')}
            </ReactRouterDom.Link>
          </div>
        </PageContainer>
      </AnimatedItem>

      <NightPatientCounter />

      <AnimatedItem as="section" className="py-16 bg-gradient-to-br from-brand-teal to-brand-blue overflow-hidden">
        <PageContainer>
          <SectionTitle theme="dark" title={t('homePage.treatmentAreasTitle')} subtitle={t('homePage.treatmentAreasSubtitle')} />
          {/* ServiceCarousel Implementation */}
          <ServiceCarousel services={allServices} />
          
          <div className="text-center mt-12">
            <ReactRouterDom.Link
              to="/hizmetlerimiz"
              className="inline-flex items-center justify-center bg-white text-brand-blue hover:bg-sky-50 px-8 py-3.5 rounded-xl shadow-lg shadow-black/10 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-semibold"
            >
              {t('buttons.allServices')}
            </ReactRouterDom.Link>
          </div>
        </PageContainer>
      </AnimatedItem>

      <AnimatedItem as="section" id="before-after" className="py-16 bg-white overflow-hidden relative">
        {/* Subtle Decorative Sparkles */}
        <div className="pointer-events-none absolute top-10 left-10 text-brand-teal/40 animate-sparkle">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
        </div>

        <PageContainer className="relative z-10">
          <SectionTitle 
            title={t('homePage.beforeAfterTitle')} 
            subtitle={t('homePage.beforeAfterSubtitle')} 
          />
          <BeforeAfterGallery />
        </PageContainer>
      </AnimatedItem>

      <AnimatedItem as="section" className="py-12 bg-gradient-to-r from-brand-cyan-light to-brand-blue-pastel">
        <PageContainer>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight">
              {t('slogan.line1' as any)}
              <br />
              {t('slogan.line2' as any)}
            </p>
          </div>
        </PageContainer>
      </AnimatedItem>

      <AnimatedItem as="section" className="py-16 bg-white overflow-hidden">
        <PageContainer>
          <SectionTitle title={t('homePage.latestPostsTitle')} subtitle={t('homePage.latestPostsSubtitle')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <AnimatedItem key={post.id} staggerIndex={index}>
                <BlogPostCard post={post} />
              </AnimatedItem>
            ))}
          </div>
           <div className="text-center mt-12">
            <ReactRouterDom.Link
              to="/blog"
              className="inline-flex items-center justify-center bg-gradient-to-r from-brand-blue to-sky-700 hover:from-brand-blue hover:to-sky-800 text-white px-8 py-3.5 rounded-xl shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-semibold"
            >
              {t('buttons.allPosts')}
            </ReactRouterDom.Link>
          </div>
        </PageContainer>
      </AnimatedItem>
      
      <AnimatedItem as="section" className="py-16 bg-stone-100 overflow-hidden">
        <PageContainer>
            <InstagramFeed />
        </PageContainer>
      </AnimatedItem>

      <AnimatedItem as="section" id="faq" className="py-16 bg-white overflow-hidden">
        <PageContainer>
          <SectionTitle title={t('homePage.faqTitle')} subtitle={t('homePage.faqSubtitle')} />
          <FaqSection />
        </PageContainer>
      </AnimatedItem>
    </>
  );
};

export default HomePage;
