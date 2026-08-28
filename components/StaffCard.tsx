import React, { useState } from 'react';
import { StaffMember } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface StaffCardProps {
  member: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  const { getLocalized } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const role = getLocalized(member.role);
  const bio = member.bio ? getLocalized(member.bio) : '';

  // Get initials for fallback avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div 
      className="relative flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 hover:border-sky-400/50 group"
    >
      {/* Image / Portrait Section */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-brand-teal/80 via-brand-blue/70 to-slate-900 overflow-hidden flex items-center justify-center">
        {member.imageUrl && !imageError ? (
          <img 
            src={member.imageUrl} 
            alt={member.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full select-none">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-white/20 to-white/5 border border-white/30 flex items-center justify-center shadow-inner mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white">
                {getInitials(member.name)}
              </span>
            </div>
            <span className="text-xs tracking-widest uppercase text-sky-200/80 font-medium">
              MESAM BEŞYOL
            </span>
          </div>
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Bottom Title on Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {member.name}
          </h3>
          <p className="text-sky-300 font-medium text-sm mt-0.5 drop-shadow">
            {role}
          </p>
        </div>
      </div>

      {/* Description / Bio Section */}
      {bio && (
        <div className="p-5 flex-grow flex flex-col justify-between bg-slate-900/40 backdrop-blur-xs border-t border-white/10">
          <p className="text-sm text-sky-100/90 leading-relaxed">
            {bio}
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-200/70">
            <span className="font-medium">Mesam Beşyol Ailesi</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Aktif Görevde" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffCard;
