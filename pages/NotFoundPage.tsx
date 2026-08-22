import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedItem from '../components/AnimatedItem';
import MetaTags from '../components/MetaTags';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <MetaTags page="notFound" />
      <div className="bg-white py-16 sm:py-24">
        <PageContainer>
          <AnimatedItem>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-6xl font-bold text-brand-teal mb-4">404</h1>
              <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl mb-4">
                {t('notFoundPage.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('notFoundPage.message')}
              </p>
              <ReactRouterDom.Link
                to="/"
                className="inline-block bg-brand-teal/80 text-white px-8 py-3 rounded-full hover:bg-brand-teal backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg font-medium text-lg"
              >
                {t('notFoundPage.button')}
              </ReactRouterDom.Link>
            </div>
          </AnimatedItem>
        </PageContainer>
      </div>
    </>
  );
};

export default NotFoundPage;
