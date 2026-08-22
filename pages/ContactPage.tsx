import React, { useEffect } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '../constants/icons';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedItem from '../components/AnimatedItem';
import MetaTags from '../components/MetaTags';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const location = ReactRouterDom.useLocation();

  useEffect(() => {
    const state = location.state as { scrollToId?: string } | null;
    if (state?.scrollToId) {
      const element = document.getElementById(state.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6 text-brand-teal" />,
      titleKey: 'footer.phone',
      content: <a href="tel:+905366549868" className="hover:text-brand-teal transition-colors">0536 654 98 68</a>,
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6 text-brand-teal" />,
      titleKey: 'footer.email',
      content: <a href="mailto:mesambesyol@gmail.com" className="hover:text-brand-teal transition-colors">mesambesyol@gmail.com</a>,
    },
    {
      icon: <MapPinIcon className="w-6 h-6 text-brand-teal" />,
      titleKey: 'general.address',
      content: <span>{t('footer.addressLine1')}<br/>{t('footer.addressLine2')}</span>,
    }
  ];

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.245239354072!2d29.05192651180217!3d40.20764987135508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3fcffcac5857%3A0x37386066313c36ca!2sMesam%20Di%C5%9F%20Klinikleri%20Besyol%20Subesi!5e1!3m2!1str!2str!4v1757612331542!5m2!1str!2str`;

  return (
    <>
      <MetaTags page="contact" />
      <div className="bg-white py-12 sm:py-16 overflow-hidden">
        <PageContainer>
          <AnimatedItem>
            <SectionTitle title={t('contactPage.title')} subtitle={t('contactPage.subtitle')} />
          </AnimatedItem>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedItem>
              <div className="space-y-8 bg-brand-blue-light/50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-brand-blue">{t('contactPage.clinicInfo')}</h3>
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">{t(item.titleKey as any)}</h4>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-800">{t('contactPage.workingHours')}</h4>
                    <ul className="mt-2 text-gray-600">
                      {t('contactPage.workingHoursList.0' as any) && <li>{t('contactPage.workingHoursList.0' as any)}</li>}
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">{t('contactPage.emergencyContact' as any).replace('{phoneNumber}', '0536 654 98 68')}</p>
                </div>
              </div>
              <div className="mt-8">
                 <iframe
                    title={t('contactPage.mapTitle')}
                    src={mapEmbedUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-lg"
                 ></iframe>
              </div>
            </AnimatedItem>

            <AnimatedItem id="randevu">
                <div className="sticky top-28">
                    <h3 className="text-2xl font-semibold text-brand-blue text-center mb-6">{t('contactPage.writeToUs')}</h3>
                    <ContactForm />
                </div>
            </AnimatedItem>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default ContactPage;