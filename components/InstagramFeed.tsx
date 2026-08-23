import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { InstagramIcon } from '../constants/icons';
import SectionTitle from './SectionTitle';
import ProgressiveImage from './ProgressiveImage';

const INSTAGRAM_POSTS = [
  { id: 1, imageUrl: 'https://i.imgur.com/50EueFr.jpeg', altKey: 'meta.home.description' },
  { id: 2, imageUrl: 'https://i.imgur.com/554vCH2.jpeg', altKey: 'meta.home.description' },
  { id: 3, imageUrl: 'https://i.imgur.com/yf6kh51.jpeg', altKey: 'meta.home.description' },
  { id: 4, imageUrl: 'https://i.imgur.com/YlYkPs3.jpeg', altKey: 'meta.home.description' },
  { id: 5, imageUrl: 'https://i.imgur.com/GqaRsez.jpeg', altKey: 'meta.home.description' },
  { id: 6, imageUrl: 'https://i.imgur.com/zWabg0L.jpeg', altKey: 'meta.home.description' },
];

const InstagramFeed: React.FC = () => {
  const { t } = useLanguage();
  const instagramProfileUrl = 'https://www.instagram.com/besyolmesam/';

  return (
    <>
      <SectionTitle 
        title={t('homePage.instagram.title')} 
        subtitle={t('homePage.instagram.subtitle')} 
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {INSTAGRAM_POSTS.map(post => (
          <a
            key={post.id}
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-square rounded-2xl overflow-hidden relative group instagram-post shadow-sm border border-slate-100"
          >
            <ProgressiveImage 
              src={post.imageUrl} 
              alt={t(post.altKey as any)}
              containerClassName="w-full h-full"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <InstagramIcon className="w-10 h-10 text-white" />
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-12">
        <a
          href={instagramProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-3.5 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium text-base shadow-md"
        >
          {t('homePage.instagram.viewProfile')}
        </a>
      </div>
    </>
  );
};

export default InstagramFeed;
