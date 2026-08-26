import { StaffMember } from '../types';

export const STAFF_DATA: StaffMember[] = [
  // Yönetici
  {
    id: 'ozkan-yasar',
    name: 'Özkan Yaşar',
    role: {
      tr: 'Klinik Müdürü / Yönetici',
      en: 'Clinic Manager / Administrator',
      de: 'Klinikmanager / Geschäftsführung'
    },
    department: 'management',
    departmentTitle: {
      tr: 'Yönetim',
      en: 'Management',
      de: 'Leitung & Verwaltung'
    },
    imageUrl: '/images/staff/ozkan-yasar.jpg',
    bio: {
      tr: 'Kliniğimizin idari, operasyonel ve organizasyonel süreçlerini yöneterek hasta memnuniyetinin en üst düzeyde sürdürülmesini sağlar.',
      en: 'Manages administrative, operational, and organizational processes to ensure the highest level of patient satisfaction.',
      de: 'Leitet die administrativen und operativen Prozesse unserer Klinik für höchste Patientenzufriedenheit.'
    },
    order: 1
  },

  // Asistanlar
  {
    id: 'derya-sivri',
    name: 'Derya Sivri',
    role: {
      tr: 'Diş Hekimi Asistanı',
      en: 'Dental Assistant',
      de: 'Zahnmedizinische Fachangestellte'
    },
    department: 'assistant',
    departmentTitle: {
      tr: 'Klinik Asistanları',
      en: 'Clinical Assistants',
      de: 'Klinikassistenz'
    },
    imageUrl: '/images/staff/derya-sivri.png',
    bio: {
      tr: 'Tedavi süreçlerinde hekimlerimize titizlikle eşlik ederek hasta konforunu ve sterilizasyon standartlarını en üst düzeyde tutar.',
      en: 'Assists our dentists throughout treatments, ensuring utmost patient comfort and strict sterilization standards.',
      de: 'Begleitet Behandlungen sorgfältig und gewährleistet Patientenkomfort sowie höchste Hygienestandards.'
    },
    order: 2
  },
  {
    id: 'isil-isik',
    name: 'Işıl Işık',
    role: {
      tr: 'Diş Hekimi Asistanı',
      en: 'Dental Assistant',
      de: 'Zahnmedizinische Fachangestellte'
    },
    department: 'assistant',
    departmentTitle: {
      tr: 'Klinik Asistanları',
      en: 'Clinical Assistants',
      de: 'Klinikassistenz'
    },
    imageUrl: '/images/staff/isil-isik.png',
    bio: {
      tr: 'Tedavi esnasında hasta rahatlığı, hijyen ve hekim asistanlığı konularında deneyimli ekibimizin değerli bir üyesidir.',
      en: 'An experienced member of our team dedicated to patient well-being, clinical hygiene, and operative assistance.',
      de: 'Ein erfahrenes Teammitglied für Patientenbetreuung, klinische Hygiene und Behandlungsassistenz.'
    },
    order: 3
  },

  // Danışma
  {
    id: 'samet-tabanli',
    name: 'Samet Tabanlı',
    role: {
      tr: 'Hasta Kabul & Danışma',
      en: 'Reception & Patient Coordinator',
      de: 'Empfang & Patientenbetreuung'
    },
    department: 'reception',
    departmentTitle: {
      tr: 'Danışma & Hasta Kabul',
      en: 'Reception & Front Desk',
      de: 'Empfang & Aufnahme'
    },
    imageUrl: '/images/staff/samet-tabanli.jpg',
    bio: {
      tr: 'Kliniğimize adım attığınız andan itibaren randevu planlaması, karşılama ve bilgilendirme süreçlerinde yanınızdadır.',
      en: 'Welcomes patients from the first moment, guiding appointment planning and all front-desk inquiries.',
      de: 'Begrüßt Sie herzlich und betreut die Terminplanung sowie alle Patientenanfragen am Empfang.'
    },
    order: 4
  },
  {
    id: 'ecem-ecem',
    name: 'Ecem Ecem',
    role: {
      tr: 'Hasta Kabul & Danışma',
      en: 'Reception & Patient Coordinator',
      de: 'Empfang & Patientenbetreuung'
    },
    department: 'reception',
    departmentTitle: {
      tr: 'Danışma & Hasta Kabul',
      en: 'Reception & Front Desk',
      de: 'Empfang & Aufnahme'
    },
    imageUrl: '/images/staff/ecem-ecem.png',
    bio: {
      tr: 'Güler yüzlü karşılaması ve organize randevu yönetimi ile kliniğimizin iletişim kalitesini temsil eder.',
      en: 'Represents our clinic’s warm communication with a friendly welcome and structured appointment coordination.',
      de: 'Repräsentiert unsere Klinik mit herzlichem Empfang und strukturierter Terminkoordination.'
    },
    order: 5
  }
];
