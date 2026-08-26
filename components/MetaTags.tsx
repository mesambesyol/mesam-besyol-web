
import React from 'react';
import { Helmet } from 'react-helmet-async';
import * as ReactRouterDom from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Service, Doctor, BlogPost, FaqItem } from '../types';
import { FAQ_DATA } from '../data/faq';

type PageKey = 'home' | 'about' | 'services' | 'doctors' | 'staff' | 'blog' | 'quiz' | 'contact' | 'appointment' | 'kvkk' | 'formSuccess' | 'notFound';
type DynamicData = Service | Doctor | BlogPost;

interface MetaTagsProps {
  page: PageKey | 'serviceDetail' | 'doctorDetail' | 'blogPost';
  data?: DynamicData;
}

const monthTrToEn: { [key: string]: string } = {
    'ocak': 'January', 'şubat': 'February', 'mart': 'March', 'nisan': 'April',
    'mayıs': 'May', 'haziran': 'June', 'temmuz': 'July', 'ağustos': 'August',
    'eylül': 'September', 'ekim': 'October', 'kasım': 'November', 'aralık': 'December'
};

const MetaTags: React.FC<MetaTagsProps> = ({ page, data }) => {
  const { t, getLocalized, language } = useLanguage();
  const location = ReactRouterDom.useLocation();

  const generateSchema = () => {
      const siteUrl = window.location.origin;
      const logoUrl = "https://i.imgur.com/ZjHgJSs.png";

      const baseSchema = {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
      "name": t('appName'),
      "image": logoUrl,
      "@id": siteUrl,
      "url": siteUrl,
      "telephone": "+905366549868",
      "priceRange": "₺₺",
      "address": {
          "@type": "PostalAddress",
          "streetAddress": t('footer.addressLine1'),
          "addressLocality": "Osmangazi",
          "addressRegion": "Bursa",
          "postalCode": "16200",
          "addressCountry": "TR"
      },
      "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.2198",
          "longitude": "29.0435"
      },
      "openingHoursSpecification": [
          {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
          }
      ],
      "sameAs": [
          "https://www.instagram.com/besyolmesam/",
          "https://www.youtube.com/besyolmesam/",
          "https://www.facebook.com/besyolmesam",
          "https://x.com/besyolmesam",
          "https://www.linkedin.com/company/besyolmesam"
      ]
      };
      
      switch (page) {
          case 'home':
              const faqSchema = {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": FAQ_DATA.map((item: FaqItem) => ({
                      "@type": "Question",
                      "name": getLocalized(item.question),
                      "acceptedAnswer": {
                          "@type": "Answer",
                          "text": getLocalized(item.answer)
                      }
                  }))
              };
              const webSiteSchema = {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": siteUrl,
                   "potentialAction": {
                      "@type": "SearchAction",
                      "target": {
                          "@type": "EntryPoint",
                          "urlTemplate": `${siteUrl}/?s={search_term_string}`
                      },
                      "query-input": "required name=search_term_string"
                  }
              };
              return [baseSchema, faqSchema, webSiteSchema];

          case 'serviceDetail':
              const service = data as Service;
              if (!service) return baseSchema;
              const serviceSchema = {
                  "@context": "https://schema.org",
                  "@type": "Service",
                  "serviceType": getLocalized(service.name),
                  "provider": {
                      "@id": siteUrl
                  },
                  "name": getLocalized(service.name),
                  "description": getLocalized(service.description)
              };
              return [baseSchema, serviceSchema];
          
          case 'doctorDetail':
              const doctor = data as Doctor;
              if (!doctor) return baseSchema;
              const personSchema = {
                  "@context": "https://schema.org",
                  "@type": "Person",
                  "name": doctor.name,
                  "jobTitle": getLocalized(doctor.title),
                  "image": doctor.imageUrl,
                  "worksFor": {
                      "@id": siteUrl
                  }
              };
              return [baseSchema, personSchema];
          
          case 'blogPost':
              const post = data as BlogPost;
              if (!post) return baseSchema;
              let authorName = '';
              if (typeof post.author === 'string') {
                  authorName = post.author;
              } else if (post.author) {
                  authorName = getLocalized(post.author);
              }
              const dateParts = post.date.split(' ');
              let isoDate = new Date().toISOString();
              if (dateParts.length === 3) {
                  const day = dateParts[0];
                  const monthNameTr = dateParts[1];
                  const year = dateParts[2];
                  const monthNameEn = monthTrToEn[monthNameTr.toLowerCase()];
                  if (monthNameEn) {
                      isoDate = new Date(`${monthNameEn} ${day}, ${year}`).toISOString();
                  }
              }
              const articleSchema = {
                  "@context": "https://schema.org",
                  "@type": "Article",
                   "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": window.location.href
                  },
                  "headline": getLocalized(post.title),
                  "image": post.imageUrl,
                  "author": {
                      "@type": "Person",
                      "name": authorName
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": t('appName'),
                    "logo": { "@type": "ImageObject", "url": logoUrl }
                  },
                  "datePublished": isoDate
              };
              return [baseSchema, articleSchema];
              
          default:
              return baseSchema;
      }
  };
    
  let title = t('appName');
  let description = t('meta.home.description');

  if (page === 'serviceDetail' && data) {
    const service = data as Service;
    const serviceName = getLocalized(service.name);
    title = `${serviceName} | ${t('appName')}`;
    description = getLocalized(service.description);
  } else if (page === 'doctorDetail' && data) {
    const doctor = data as Doctor;
    const doctorName = doctor.name;
    const doctorTitle = getLocalized(doctor.title);
    title = `${doctorName} - ${doctorTitle} | ${t('appName')}`;
    description = getLocalized(doctor.bio);
  } else if (page === 'blogPost' && data) {
    const post = data as BlogPost;
    const postTitle = getLocalized(post.title);
    title = `${postTitle} | ${t('appName')}`;
    description = getLocalized(post.summary);
  } else if (['home', 'about', 'services', 'doctors', 'staff', 'blog', 'quiz', 'contact', 'appointment', 'kvkk', 'formSuccess', 'notFound'].includes(page)) {
    title = t(`meta.${page}.title` as any);
    description = t(`meta.${page}.description` as any);
  }

  const canonicalUrl = window.location.origin + location.pathname;

  let imageUrl = "https://i.hizliresim.com/cbkglw1.jpg";
  if (data && 'imageUrl' in data && typeof data.imageUrl === 'string') {
      imageUrl = data.imageUrl;
  }
  
  const pageType = (page === 'blogPost' || page === 'serviceDetail') ? 'article' : 'website';
  const schema = generateSchema();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content={t('appName')} />
      <meta property="og:locale" content={language} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@besyolmesam" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default MetaTags;