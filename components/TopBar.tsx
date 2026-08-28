
import React, { useState, useEffect } from 'react';
import { MapPinIcon, InstagramIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';

const TopBar: React.FC = () => {
    const { t } = useLanguage();
    const fullAddress = `${t('footer.addressLine1')} ${t('footer.addressLine2')}`;
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=Mesam+Diş+Klinikleri+Besyol+Subesi`;

    const [isNightDuty, setIsNightDuty] = useState(false);

    useEffect(() => {
        const checkDutyTime = () => {
            const hour = new Date().getHours();
            // Active between 19:00 (7 PM) and 09:00 (9 AM)
            setIsNightDuty(hour >= 19 || hour < 9);
        };
        checkDutyTime();
        const interval = setInterval(checkDutyTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const socialLinks = [
      { href: "https://www.instagram.com/besyolmesam/", label: t('footer.socialMedia.instagram'), Icon: InstagramIcon },
    ];

    return (
        <div className="bg-gray-800 text-white text-[12px] relative z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-x-4 gap-y-2 py-2">
                {/* Address on the left */}
                <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                    <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-sky-300 transition-colors"
                        aria-label={`${t('general.address')}: ${fullAddress}`}
                    >
                        <MapPinIcon className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        <span>{fullAddress}</span>
                    </a>

                    {/* 7/24 Status Badge */}
                    {isNightDuty ? (
                        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 live-duty-pulse inline-block" />
                            <span>7/24 Açık • Nöbetçi Hekim Aktif</span>
                        </span>
                    ) : (
                        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 text-[11px] font-medium shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                            <span>7/24 Kesintisiz Açık Diş Kliniği</span>
                        </span>
                    )}
                </div>

                {/* Right side: Emergency phone & Social icons */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Emergency Call Link */}
                    <a
                        href="tel:+905366549868"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                        aria-label="7/24 Acil Diş Nöbetçi Hattı: 0536 654 98 68"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 live-duty-pulse inline-block" />
                        <span className="font-bold">7/24 Acil:</span>
                        <span>0536 654 98 68</span>
                    </a>

                    {/* Mobile Duty Indicator */}
                    {isNightDuty ? (
                        <span className="inline-flex md:hidden items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-medium">
                            <span>Nöbetçi Hekim</span>
                        </span>
                    ) : (
                        <span className="inline-flex md:hidden items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 text-[10px] font-medium">
                            <span>7/24</span>
                        </span>
                    )}
                    {socialLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-300 transition-colors"
                            aria-label={link.label}
                        >
                            <link.Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
