
import { HeroSlideItem } from '../types';

export const HERO_SLIDES_DATA: HeroSlideItem[] = [
  {
    id: 'slide1',
    imageUrl: 'https://i.imgur.com/iGxmYnd.jpeg',
    titleKey: 'heroSlider.slide1.title',
    subtitleKey: 'heroSlider.slide1.subtitle',
    ctas: [
      { textKey: 'navbar.doctors', path: '/hekimlerimiz', variant: 'primary' },
      { textKey: 'navbar.about', path: '/hakkimizda', variant: 'outline' },
    ],
  },
  {
    id: 'slide4',
    imageUrl: 'https://i.hizliresim.com/et7bzpq.jpg',
    titleKey: 'heroSlider.slide4.title',
    subtitleKey: 'heroSlider.slide4.subtitle',
    ctas: [
      { textKey: 'navbar.services', path: '/hizmetlerimiz', variant: 'primary' },
      { 
        textKey: 'buttons.appointmentWhatsapp', 
        variant: 'whatsapp', 
        isExternal: true, 
        externalUrl: 'https://wa.me/905366549868',
        icon: 'whatsapp'
      },
    ],
  },
  {
    id: 'slide2',
    imageUrl: 'https://i.imgur.com/UTDXF6E.jpeg',
    titleKey: 'heroSlider.slide2.title',
    subtitleKey: 'heroSlider.slide2.subtitle',
    ctas: [
      { textKey: 'navbar.contact', path: '/iletisim', variant: 'primary' },
      { textKey: 'navbar.blog', path: '/blog', variant: 'outline' },
    ],
  },
  {
    id: 'slide3',
    imageUrl: 'https://i.imgur.com/qZQZ3yr.jpeg',
    titleKey: 'heroSlider.slide3.title',
    subtitleKey: 'heroSlider.slide3.subtitle',
    ctas: [
      { textKey: 'navbar.quiz', path: '/test', variant: 'primary' },
      { 
        textKey: 'buttons.appointmentWhatsapp', 
        variant: 'whatsapp', 
        isExternal: true, 
        externalUrl: 'https://wa.me/905366549868',
        icon: 'whatsapp'
      },
    ],
  },
];
