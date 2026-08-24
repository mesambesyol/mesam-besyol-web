
import React, { useState, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { BlogPost } from '../types';
import { CalendarDaysIcon, UserCircleIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const { t, getLocalized, formatDate } = useLanguage();

  const title = getLocalized(post.title);
  const summary = getLocalized(post.summary);
  
  let authorDisplay: string | undefined;
  if (typeof post.author === 'string') {
    authorDisplay = post.author;
  } else if (post.author) {
    authorDisplay = getLocalized(post.author);
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <ReactRouterDom.Link to={`/blog/${post.slug}`} className="block group h-full select-none" aria-label={`${t('buttons.readMore')} ${title}`}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-brand-blue/15"
      >
        {/* Dynamic Soft Light Glare Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
            opacity: glarePosition.opacity,
          }}
        />

        <div className="flex-shrink-0 h-52 overflow-hidden relative">
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108" src={post.imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="text-xs font-medium text-slate-500 mb-3 flex items-center flex-wrap gap-x-3 gap-y-1">
            <time dateTime={post.date} className="flex items-center">
              <CalendarDaysIcon className="w-3.5 h-3.5 mr-1.5 text-brand-teal icon-bounce" />
              {formatDate(post.date)}
            </time>
            {authorDisplay && (
              <span className="flex items-center">
                <UserCircleIcon className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
                {authorDisplay}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-slate-600 flex-grow mb-5 line-clamp-3 leading-relaxed">{summary}</p>
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center text-sm font-semibold text-brand-teal group-hover:text-brand-blue transition-colors">
              {t('buttons.readMore')} →
            </span>
          </div>
        </div>
      </div>
    </ReactRouterDom.Link>
  );
};

export default BlogPostCard;