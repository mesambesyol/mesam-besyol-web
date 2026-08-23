import * as React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import SectionTitle from '../components/SectionTitle';
import { useLanguage } from '../contexts/LanguageContext';
import MetaTags from '../components/MetaTags';
import ProgressiveImage from '../components/ProgressiveImage';

const AppointmentPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = ReactRouterDom.useNavigate();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        navigate('/form-basarili');
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <MetaTags page="appointment" />
      <div className="bg-gradient-to-br from-brand-cyan-light to-brand-blue-pastel py-12 sm:py-16">
        <PageContainer>
          <SectionTitle title={t('careerForm.title')} subtitle={t('careerForm.subtitle')} />
          
          <div className="mt-10 max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
            <div className="mb-10 lg:mb-0 lg:sticky lg:top-28">
              <ProgressiveImage
                src="https://i.imgur.com/YlYkPs3.jpeg"
                alt={t('careerForm.visualAlt')}
                containerClassName="rounded-2xl shadow-xl w-full max-h-[500px] lg:max-h-[calc(100vh-8rem)] overflow-hidden aspect-[4/3]"
                className="object-cover"
                loading="eager"
              />
            </div>

            <div>
                <form 
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xgvzjnjv"
                  method="POST"
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-2xl space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700">
                        {t('careerForm.firstName')} <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="firstName" id="firstName" required className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700">
                        {t('careerForm.lastName')} <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="lastName" id="lastName" required className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">
                        {t('careerForm.phone')} <span className="text-red-500">*</span>
                      </label>
                      <input type="tel" name="phone" id="phone" required className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                        {t('careerForm.emailOptional')} <span className="text-red-500">*</span>
                      </label>
                      <input type="email" name="email" id="email" required className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-slate-700">
                      {t('careerForm.positionSelection')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="position"
                      id="position"
                      required
                      defaultValue=""
                      className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm appearance-none bg-white bg-no-repeat bg-right pr-8 text-gray-500 transition-colors"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
                      onChange={(e) => { e.target.classList.toggle('text-gray-500', !e.target.value); e.target.classList.toggle('text-gray-900', !!e.target.value);}}
                    >
                      <option value="" disabled>{t('careerForm.selectPositionPlaceholder')}</option>
                      <option value="dentist">{t('careerForm.positions.dentist')}</option>
                      <option value="assistant">{t('careerForm.positions.assistant')}</option>
                      <option value="reception">{t('careerForm.positions.reception')}</option>
                      <option value="partner">{t('careerForm.positions.partner')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-slate-700">
                      {t('careerForm.experience')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="experience"
                      id="experience"
                      required
                      defaultValue=""
                      className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm appearance-none bg-white bg-no-repeat bg-right pr-8 text-gray-500 transition-colors"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
                      onChange={(e) => { e.target.classList.toggle('text-gray-500', !e.target.value); e.target.classList.toggle('text-gray-900', !!e.target.value);}}
                    >
                      <option value="" disabled>{t('careerForm.selectExperiencePlaceholder')}</option>
                      <option value="newGrad">{t('careerForm.experienceOptions.newGrad')}</option>
                      <option value="mid">{t('careerForm.experienceOptions.mid')}</option>
                      <option value="experienced">{t('careerForm.experienceOptions.experienced')}</option>
                      <option value="expert">{t('careerForm.experienceOptions.expert')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-slate-700">
                      {t('careerForm.additionalNotes')}
                    </label>
                    <textarea name="notes" id="notes" rows={4} placeholder={t('careerForm.notesPlaceholder')} className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"></textarea>
                  </div>

                  <div>
                    <button type="submit" disabled={status === "sending"} className="w-full flex justify-center py-3.5 px-6 border border-teal-500/30 rounded-xl shadow-md shadow-teal-600/20 text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-600/30 active:scale-[0.98] disabled:bg-gray-400 disabled:shadow-none disabled:transform-none btn-shimmer">
                      {status === "sending" ? t('general.loading') : t('careerForm.submitButton')}
                    </button>
                    <p className="mt-3 text-xs text-slate-500 text-center">{t('careerForm.submissionInfo')}</p>
                  </div>
                  {status === "error" && <p className="text-red-500 text-sm mt-2 text-center font-medium">{t('general.error')}</p>}
                </form>
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default AppointmentPage;
