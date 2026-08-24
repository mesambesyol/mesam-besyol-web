import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { MenuIcon, XMarkIcon, ChevronDownIcon, TurkeyFlagIcon, UKFlagIcon, GermanyFlagIcon, WhatsAppIcon } from '../constants/icons';
import { NAV_LINKS } from '../constants/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const location = ReactRouterDom.useLocation();
  const { language, setLanguage, t, getLocalized } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';
  const whatsappLink = `https://wa.me/905366549868`;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHomePage ? 50 : 10;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isTransparent = !isScrolled && isHomePage;

  const headerClasses = `sticky top-0 z-50 transition-all duration-300 ${
    isTransparent 
      ? 'bg-transparent text-gray-800' 
      : 'bg-white text-gray-800 shadow-lg'
  }`;
  
  const logoClasses = `w-auto transition-all duration-300 cursor-pointer select-none ${
    isScrolled || !isHomePage ? 'h-10 lg:h-10' : 'h-10 lg:h-12'
  }`;

  const headerHeightClasses = `h-20 lg:transition-all lg:duration-300 ${
    isScrolled || !isHomePage ? 'lg:h-20' : 'lg:h-24'
  }`;

  const getLinkClasses = (path?: string) => {
    const isActive = location.pathname === path;
    
    // Optimized padding: px-2 for LG, px-3 for XL to fit German text
    const baseClasses = `px-2 xl:px-3 py-2 rounded-md text-[12px] font-semibold transition-colors cursor-pointer select-none`;
    const themeClasses = isTransparent
      ? 'text-gray-800 hover:text-brand-blue [text-shadow:0_1px_2px_rgba(255,255,255,0.9)]'
      : 'text-gray-600 hover:text-brand-blue';
    const activeClasses = isActive
      ? (isTransparent ? 'bg-black/10' : 'text-brand-blue')
      : '';

    return `${baseClasses} ${themeClasses} ${activeClasses}`;
  };
  
  const mobileMenuIconClasses = `p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset cursor-pointer ${
    isTransparent
      ? 'text-gray-800 hover:bg-black/10 focus:ring-brand-blue [filter:drop-shadow(0_1px_2px_rgba(255,255,255,0.9))]'
      : 'text-gray-800 hover:bg-gray-100 focus:ring-brand-blue'
  }`;

  // Function to scroll to top if user is already on home page
  const scrollToTopIfHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Function to navigate or scroll to top smoothly when logo is clicked
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const languages = [
    { code: 'tr' as Language, nameKey: 'navbar.languages.tr', Icon: TurkeyFlagIcon },
    { code: 'en' as Language, nameKey: 'navbar.languages.en', Icon: UKFlagIcon },
    { code: 'de' as Language, nameKey: 'navbar.languages.de', Icon: GermanyFlagIcon },
  ];
  
  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  const LanguageSelector = ({ isMobile = false }) => {
    const buttonBaseClasses = 'flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-[12px] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue';
    const buttonThemeClasses = isTransparent && !isMobile
      ? 'bg-black/5 text-gray-800 hover:bg-black/10 [text-shadow:0_1px_1px_rgba(255,255,255,0.9)]'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    
    const dropdownClasses = `absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 origin-top-right transition-all duration-200 ease-out ${isLangDropdownOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`;
  
    return (
      <div className={`relative ${isMobile ? 'flex justify-center mt-4' : 'ml-1 xl:ml-4'}`} ref={langDropdownRef}>
        <div>
          <button
            type="button"
            className={`${buttonBaseClasses} ${buttonThemeClasses}`}
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isLangDropdownOpen}
            aria-label={t('navbar.selectLanguage')}
          >
            <selectedLanguage.Icon className="w-5 h-auto rounded-sm object-cover shadow-sm" />
            <span className="font-bold">{selectedLanguage.code.toUpperCase()}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={dropdownClasses} role="menu" aria-orientation="vertical">
          <div className="py-1" role="none">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLangDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-[12px] text-left ${language === lang.code ? 'font-bold text-brand-blue bg-brand-blue-light' : 'text-gray-700 hover:bg-gray-100'}`}
                role="menuitem"
              >
                <lang.Icon className="w-5 h-auto rounded-sm object-cover shadow-sm" />
                <span>{t(lang.nameKey as any)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <header className={headerClasses}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${headerHeightClasses}`}>
          <div className="flex-shrink-0">
            <ReactRouterDom.Link 
              to="/" 
              className="flex items-center cursor-pointer select-none group focus:outline-none" 
              aria-label={t('appName') + ' ' + t('navbar.home')}
              onClick={handleLogoClick}
            >
              <img 
                className={logoClasses}
                src="https://i.imgur.com/ZjHgJSs.png" 
                alt={`${t('appName')} Logo`}
                draggable={false}
              />
            </ReactRouterDom.Link>
          </div>

          {/* Desktop Nav: Reduced spacing (space-x-1) on LG to prevent overflow */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2 items-center" ref={navRef}>
            {NAV_LINKS.map((link) => 
              link.children ? (
                <div 
                  key={getLocalized(link.name)} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(getLocalized(link.name))}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`${getLinkClasses(link.path)} flex items-center gap-1`}>
                    {getLocalized(link.name)}
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === getLocalized(link.name) ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 pt-3 
                      transition-all duration-300 ease-in-out
                      ${activeDropdown === getLocalized(link.name) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                    `}
                  >
                    <div className="w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        {link.children.map(child => (
                           <ReactRouterDom.Link
                            key={child.path}
                            to={child.path!}
                            className="block px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-100 hover:text-brand-blue transition-colors"
                          >
                            {getLocalized(child.name)}
                          </ReactRouterDom.Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ReactRouterDom.Link
                  key={link.path}
                  to={link.path!}
                  className={`${getLinkClasses(link.path)} nav-link-desktop`}
                  onClick={link.path === '/' ? scrollToTopIfHome : undefined}
                >
                  {getLocalized(link.name)}
                </ReactRouterDom.Link>
              )
            )}
             <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 xl:ml-4 inline-flex items-center justify-center gap-2 px-3.5 xl:px-4 py-2 border border-emerald-400/40 rounded-full text-[12px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cta-pulse"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="hidden xl:inline">{t('header.whatsappLine')}</span>
            </a>
            <ReactRouterDom.Link
              to="/randevu" 
              className="inline-flex items-center justify-center px-3.5 xl:px-4 py-2 border border-teal-400/40 rounded-full text-[12px] font-semibold text-white bg-gradient-to-r from-brand-teal to-teal-700 hover:from-teal-600 hover:to-teal-800 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 btn-shimmer"
            >
              {t('buttons.appointment')}
            </ReactRouterDom.Link>
            <LanguageSelector />
          </nav>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={mobileMenuIconClasses}
              aria-label={t('navbar.openMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 transition-opacity lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-100 absolute top-full left-0 right-0 z-40 transform origin-top transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-3" id="mobile-menu">
            <nav className="px-4 pt-3 pb-5 space-y-1.5 sm:px-6" role="navigation" aria-label="Mobil ana navigasyon">
             {NAV_LINKS.map(item => {
               const itemName = getLocalized(item.name);
               if (item.children) {
                 const isDropdownOpen = mobileActiveDropdown === itemName;
                 return (
                   <div key={itemName}>
                     <button
                       onClick={() => setMobileActiveDropdown(isDropdownOpen ? null : itemName)}
                       className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-brand-blue-light hover:text-brand-blue transition-colors"
                     >
                       <span>{itemName}</span>
                       <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                     </button>
                     <div className={`pl-4 overflow-hidden transition-all duration-500 ease-in-out ${isDropdownOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                       <div className="pt-1 pb-2 space-y-1">
                          {item.children.map(child => (
                            <ReactRouterDom.Link
                                key={child.path}
                                to={child.path!}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-brand-blue transition-colors ${
                                    location.pathname === child.path ? 'bg-brand-blue-light text-brand-blue' : ''
                                }`}
                            >
                                {getLocalized(child.name)}
                            </ReactRouterDom.Link>
                          ))}
                       </div>
                     </div>
                   </div>
                 );
               } else {
                 return (
                   <ReactRouterDom.Link
                     key={item.path}
                     to={item.path!}
                     onClick={() => {
                       setIsMobileMenuOpen(false);
                       if (item.path === '/') scrollToTopIfHome();
                     }}
                     className={`text-gray-700 hover:bg-brand-blue-light hover:text-brand-blue block px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                       location.pathname === item.path ? 'bg-brand-blue-light text-brand-blue' : ''
                     }`}
                   >
                     {itemName}
                   </ReactRouterDom.Link>
                 );
               }
             })}
             <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-emerald-400/40 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md shadow-emerald-500/20 active:scale-98 transition-all duration-200 cta-pulse"
            >
               <WhatsAppIcon className="w-5 h-5" />
              <span>{t('header.whatsappLine')}</span>
            </a>
            <ReactRouterDom.Link
              to="/randevu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center w-full px-4 py-2.5 border border-teal-400/40 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-teal-700 hover:from-teal-600 hover:to-teal-800 shadow-md shadow-teal-500/20 active:scale-98 transition-all duration-200 btn-shimmer"
            >
              {t('buttons.appointment')}
            </ReactRouterDom.Link>
            <LanguageSelector isMobile={true}/>
          </nav>
        </div>
      </>
      )}
    </header>
  );
};

export default Navbar;