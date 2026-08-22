
import React from 'react';
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

  return (
    <ReactRouterDom.Link to={`/blog/${post.slug}`} className="block group h-full" aria-label={`${t('buttons.readMore')} ${title}`}>
      <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-brand-blue/10 group-hover:-translate-y-1.5">
        <div className="flex-shrink-0 h-52 overflow-hidden relative">
          <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={post.imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="text-xs font-medium text-slate-500 mb-3 flex items-center flex-wrap gap-x-3 gap-y-1">
            <time dateTime={post.date} className="flex items-center">
              <CalendarDaysIcon className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
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