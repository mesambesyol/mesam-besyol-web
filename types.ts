

import React from 'react';

export type Language = 'tr' | 'en' | 'de';

export interface LocalizedString {
  tr: string;
  en: string;
  de?: string; 
}

export interface NavLinkItem {
  name: LocalizedString;
  path?: string; // Path is optional for dropdown parent elements
  children?: NavLinkItem[]; // Children for dropdown menus
}

export interface Service {
  id: string;
  name: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  longDescription: LocalizedString;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  imageUrl: string;
  relatedDoctorIds?: string[];
}

export interface BlogPost {
  id: string;
  slug: string; 
  title: LocalizedString;
  date: string; 
  author?: string | LocalizedString; // Updated to allow LocalizedString
  imageUrl: string;
  summary: LocalizedString;
  content: LocalizedString; // Updated from string to LocalizedString
  tags?: string[];
  relatedServiceId?: string;
}

export interface DoctorDetailSection {
  title: LocalizedString;
  content: LocalizedString;
  icon?: 'academic' | 'clipboard' | 'briefcase' | 'sparkles'; // To map to icons
}

export interface DoctorDetails {
  introduction: LocalizedString;
  sections: DoctorDetailSection[];
}

export interface Doctor {
  id: string;
  name: string; 
  title: LocalizedString; 
  imageUrl: string; 
  bio: LocalizedString;
  details?: DoctorDetails;
}

export interface AppointmentData {
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientSurname: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}

export interface CtaButtonConfig {
  textKey: string; 
  path?: string;
  variant: 'primary' | 'secondary' | 'outline' | 'whatsapp'; 
  scrollToId?: string; 
  isExternal?: boolean;
  externalUrl?: string;
  icon?: 'whatsapp' | 'info' | 'calendar' | 'blog' | 'quiz' | 'arrow';
}

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  titleKey: string; 
  subtitleKey: string; 
  cta1?: CtaButtonConfig;
  cta2?: CtaButtonConfig;
  cta3?: CtaButtonConfig;
  ctas?: CtaButtonConfig[];
}

export interface QuizQuestion {
  id: number;
  question: LocalizedString;
  options: LocalizedString[];
  correctAnswerIndex: number;
  explanation: LocalizedString;
}

export interface QuizResultLevel {
  title: LocalizedString;
  text: LocalizedString;
}

export interface StaffMember {
  id: string;
  name: string;
  role: LocalizedString;
  department: 'management' | 'assistant' | 'reception' | 'all';
  departmentTitle: LocalizedString;
  imageUrl?: string;
  bio?: LocalizedString;
  order?: number;
}

export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}