
import React, { useState } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm: React.FC = () => {
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
    <form 
      onSubmit={handleSubmit}
      action="https://formspree.io/f/xgvzjnjv"
      method="POST"
      className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700">{t('contactForm.fullName')}</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700">{t('contactForm.emailOptional')}</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">{t('contactForm.phone')}</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">{t('contactForm.subject')}</label>
        <input
          type="text"
          name="subject"
          id="subject"
          className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700">{t('contactForm.message')}</label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="mt-1.5 block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm bg-white transition-colors"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex justify-center py-3.5 px-6 border border-teal-500/30 rounded-xl shadow-md shadow-teal-600/20 text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-600/30 active:scale-[0.98] disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
        >
          {status === "sending" ? t('general.loading') : t('buttons.sendMessage')}
        </button>
      </div>
       {status === "error" && <p className="text-red-500 text-sm mt-2 text-center font-medium">{t('general.error')}</p>}
    </form>
  );
};

export default ContactForm;
