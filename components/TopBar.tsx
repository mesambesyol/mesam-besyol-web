
import React from 'react';
import { MapPinIcon, InstagramIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';

const TopBar: React.FC = () => {
    const { t } = useLanguage();
    const fullAddress = `${t('footer.addressLine1')} ${t('footer.addressLine2')}`;
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=Mesam+Diş+Klinikleri+Besyol+Subesi`;

    const socialLinks = [
      { href: "https://www.instagram.com/besyolmesam/", label: t('footer.socialMedia.instagram'), Icon: InstagramIcon },
    ];

    return (
        <div className="bg-gray-800 text-white text-[12px] relative z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-x-4 gap-y-2 py-2">
                {/* Address on the left */}
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

                {/* Social icons on the right */}
                <div className="flex items-center space-x-4">
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
