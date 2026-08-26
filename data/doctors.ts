
import { Doctor } from '../types';

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dt-hasan-sinankili',
    name: 'Hasan Sinankılı',
    title: { tr: 'Kurucu & Diş Hekimi', en: 'Founder & Dentist', de: 'Gründer & Zahnarzt' },
    imageUrl: 'https://i.imgur.com/C3npTtG.jpeg',
    bio: {
      tr: 'Sivas Cumhuriyet Üniversitesi 2017 mezunu, deneyimli ve girişimci bir hekimdir. İmplantoloji ve ileri cerrahi alanlarında aldığı eğitimlerle güncel tedavi yöntemleri sunmaktadır.',
      en: 'A 2017 graduate of Sivas Cumhuriyet University, he is an experienced and entrepreneurial dentist. He offers current treatment methods with his training in implantology and advanced surgery.',
      de: 'Als Absolvent der Sivas Cumhuriyet Universität von 2017 ist er ein erfahrener und unternehmerischer Zahnarzt. Mit seiner Ausbildung in Implantologie und fortgeschrittener Chirurgie bietet er aktuelle Behandlungsmethoden an.'
    },
    details: {
      introduction: {
        tr: 'Sivas Cumhuriyet Üniversitesi Diş Hekimliği Fakültesi 2017 yılı mezunu, deneyimli ve girişimci bir diş hekimidir. Mezuniyetinden bu yana aktif klinik hekimliğinin yanı sıra, Bursa\'da kurduğu çeşitli polikliniklerin yöneticiliğini yapmaktadır. İmplantoloji, ileri cerrahi ve estetik diş hekimliği alanlarında yurt içi ve yurt dışında aldığı kapsamlı eğitimlerle mesleki yetkinliğini sürekli olarak üst seviyede tutmaktadır.',
        en: 'A 2017 graduate of Sivas Cumhuriyet University Faculty of Dentistry, he is an experienced and entrepreneurial dentist. Since his graduation, in addition to his active clinical practice, he has been managing various polyclinics he founded in Bursa. He continuously maintains his professional competence at the highest level with extensive training he has received both domestically and abroad in the fields of implantology, advanced surgery, and aesthetic dentistry.',
        de: 'Als Absolvent der Fakultät für Zahnmedizin der Sivas Cumhuriyet Universität von 2017 ist er ein erfahrener und unternehmerischer Zahnarzt. Seit seinem Abschluss leitet er neben seiner aktiven klinischen Praxis verschiedene von ihm in Bursa gegründete Polikliniken. Er hält seine fachliche Kompetenz durch umfangreiche Schulungen im In- und Ausland in den Bereichen Implantologie, fortgeschrittene Chirurgie und ästhetische Zahnheilkunde kontinuierlich auf höchstem Niveau.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: {
            tr: '<ul><li>Sivas Cumhuriyet Üniversitesi – Diş Hekimliği Fakültesi (2017)</li><li>Aksaray Fen Lisesi (2011)</li></ul>',
            en: '<ul><li>Sivas Cumhuriyet University – Faculty of Dentistry (2017)</li><li>Aksaray Science High School (2011)</li></ul>',
            de: '<ul><li>Sivas Cumhuriyet Universität – Fakultät für Zahnmedizin (2017)</li><li>Aksaray Wissenschaftsgymnasium (2011)</li></ul>',
          }
        },
        {
          title: { tr: 'Deneyim', en: 'Experience', de: 'Erfahrung' },
          icon: 'briefcase',
          content: {
            tr: '<ul><li><strong>Klinik Sahibi & Diş Hekimi | MESAM Beşyol Diş Polikliniği:</strong> "7 gün 24 saat kesintisiz hizmet" anlayışıyla çalışan Mesam Beşyol Diş Polikliniğinde 2023\'ten beri hem kurucu hekim hem de aktif diş hekimi olarak görev yapmaktadır.</li><li><strong>Kurucu & Klinik Sahibi | Prussa Ağız ve Diş Sağlığı Polikliniği:</strong> 2022 senesinde Demirci\'de kendi kliniğini kurarak girişimci kimliğini hekimlikle birleştirmiştir.</li><li><strong>Klinik Sahibi & Diş Hekimi | MESAM Teleferik Diş Polikliniği:</strong> 2022 senesinde devraldığı Mesam Teleferik şubesi klinik sahibi olarak hizmet vermektedir.</li></ul>',
            en: '<ul><li><strong>Clinic Owner & Dentist | MESAM Beşyol Dental Polyclinic:</strong> He has been serving as both the founding physician and an active dentist at Mesam Beşyol Dental Polyclinic since 2023, which operates with a "7 days 24 hours uninterrupted service" philosophy.</li><li><strong>Founder & Clinic Owner | Prussa Oral and Dental Health Polyclinic:</strong> In 2022, he combined his entrepreneurial identity with his medical profession by establishing his own clinic in Demirci.</li><li><strong>Clinic Owner & Dentist | MESAM Teleferik Dental Polyclinic:</strong> He serves as the clinic owner of the Mesam Teleferik branch, which he took over in 2022.</li></ul>',
            de: '<ul><li><strong>Klinikinhaber & Zahnarzt | MESAM Beşyol Zahnpoliklinik:</strong> Seit 2023 ist er sowohl als Gründungsarzt als auch als aktiver Zahnarzt in der Mesam Beşyol Zahnpoliklinik tätig, die nach dem Motto "7 Tage 24 Stunden ununterbrochener Dienst" arbeitet.</li><li><strong>Gründer & Klinikinhaber | Prussa Mund- und Zahngesundheitspoliklinik:</strong> Im Jahr 2022 verband er seine unternehmerische Identität mit seinem ärztlichen Beruf, indem er seine eigene Klinik in Demirci gründete.</li><li><strong>Klinikinhaber & Zahnarzt | MESAM Teleferik Zahnpoliklinik:</strong> Er ist als Klinikinhaber der Mesam Teleferik Filiale tätig, die er 2022 übernommen hat.</li></ul>',
          }
        },
        {
          title: { tr: 'Katıldığı Eğitim ve Kongreler', en: 'Trainings and Congresses Attended', de: 'Teilgenommene Schulungen und Kongresse' },
          icon: 'clipboard',
          content: {
            tr: '<ul><li>İleri Cerrahi ve Periodontal Tedavi Eğitimleri | Türkiye Geneli</li><li>İmplant Üstü Protez Eğitimleri | Türkiye Geneli</li><li>Anterior Estetik Dolgu Eğitimleri | Türkiye Geneli</li><li>İmplant Kongresi | KKTC</li><li>İmplant Eğitimi | İspanya</li><li>İmplant Fabrika Gezisi ve Eğitimi | Güney Kore</li><li>Diot Lazer ve Lamina Eğitimi | BBK Akademi, İzmir (2016)</li><li>İmplant Eğitimi | Meriofert, Ankara (2016)</li></ul>',
            en: '<ul><li>Advanced Surgery and Periodontal Treatment Trainings | Turkey-wide</li><li>Implant-Supported Prosthesis Trainings | Turkey-wide</li><li>Anterior Aesthetic Filling Trainings | Turkey-wide</li><li>Implant Congress | TRNC</li><li>Implant Training | Spain</li><li>Implant Factory Tour and Training | South Korea</li><li>Diot Laser and Laminate Training | BBK Academy, İzmir (2016)</li><li>Implant Training | Meriofert, Ankara (2016)</li></ul>',
            de: '<ul><li>Fortgeschrittene Chirurgie- und Parodontalbehandlungsschulungen | Türkeiweit</li><li>Schulungen für implantatgestützte Prothesen | Türkeiweit</li><li>Schulungen für ästhetische Füllungen im Frontzahnbereich | Türkeiweit</li><li>Implantat-Kongress | TRNZ</li><li>Implantat-Schulung | Spanien</li><li>Implantat-Werksbesichtigung und Schulung | Südkorea</li><li>Diot-Laser- und Laminat-Schulung | BBK Akademie, İzmir (2016)</li><li>Implantat-Schulung | Meriofert, Ankara (2016)</li></ul>',
          }
        }
      ]
    }
  },
  {
    id: 'dt-burak-senol',
    name: 'Burak Şenol',
    title: { tr: 'Mesul Müdür', en: 'Responsible Manager', de: 'Verantwortlicher Leiter' },
    imageUrl: 'https://i.imgur.com/hiRrliU.jpeg',
    bio: { 
      tr: 'Cumhuriyet Üniversitesi mezunu, cerrahi ve estetik diş tedavileri alanında deneyimli diş hekimi. Gömülü 20 yaş diş çekimleri ve implantoloji uygulamaları üzerine odaklanmıştır.',
      en: 'A graduate of Cumhuriyet University, an experienced dentist in surgical and aesthetic dental treatments, focused on impacted wisdom tooth extractions and implantology applications.',
      de: 'Absolvent der Cumhuriyet-Universität, ein erfahrener Zahnarzt für chirurgische und ästhetische Zahnbehandlungen mit Schwerpunkt auf Extraktion impaktierter Weisheitszähne und implantologische Anwendungen.'
    },
    details: {
      introduction: {
        tr: 'Cumhuriyet Üniversitesi Diş Hekimliği Fakültesi mezunu, cerrahi ve estetik diş tedavileri alanında deneyimli diş hekimi. Gömülü 20 yaş diş çekimleri, estetik dolgular, diş eti uygulamaları ve implantoloji alanlarında çalışmalarını sürdürmektedir. Hasta memnuniyetini önceliklendiren, gelişen diş hekimliği teknolojilerini yakından takip eden bir profesyoneldir.',
        en: 'A graduate of Cumhuriyet University Faculty of Dentistry, an experienced dentist in surgical and aesthetic dental treatments, actively practicing in impacted wisdom tooth extractions, aesthetic restorations, and implantology. A professional focused on patient satisfaction who closely follows developing dental technologies.',
        de: 'Absolvent der Fakultät für Zahnmedizin der Cumhuriyet-Universität, ein erfahrener Zahnarzt für chirurgische und ästhetische Zahnbehandlungen, tätig in den Bereichen Extraktion impaktierter Weisheitszähne, ästhetische Füllungen und Implantologie. Ein auf Patientenzufriedenheit ausgerichteter Profi, der moderne zahnmedizinische Technologien verfolgt.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: { tr: '<ul><li>Cumhuriyet Üniversitesi – Diş Hekimliği Fakültesi (2021)</li></ul>', en: '<ul><li>Cumhuriyet University – Faculty of Dentistry (2021)</li></ul>', de: '<ul><li>Universität Cumhuriyet – Fakultät für Zahnmedizin (2021)</li></ul>' }
        },
        {
          title: { tr: 'Deneyim', en: 'Experience', de: 'Erfahrung' },
          icon: 'briefcase',
          content: { tr: '<ul><li>Cerrahi Diş Tedavileri – Gömülü 20 yaş diş çekimleri ve implant uygulamaları</li><li>Diş Eti Uygulamaları – Periodontal tedaviler ve estetik diş eti işlemleri</li><li>Protetik Diş Tedavileri – Kron, köprü ve protez uygulamaları</li></ul>', en: '<ul><li>Surgical Dental Treatments – Impacted wisdom tooth extractions and implant applications</li><li>Gum Applications – Periodontal treatments and aesthetic gum procedures</li><li>Prosthetic Dental Treatments – Crown, bridge, and prosthesis applications</li></ul>', de: '<ul><li>Chirurgische Zahnbehandlungen – Extraktionen impaktierter Weisheitszähne und Implantatanwendungen</li><li>Zahnfleischanwendungen – Parodontalbehandlungen und ästhetische Zahnfleischbehandlungen</li><li>Prothetische Zahnbehandlungen – Kronen-, Brücken- und Prothesenanwendungen</li></ul>' }
        },
        {
          title: { tr: 'Mesleki İlgi Alanları', en: 'Areas of Professional Interest', de: 'Berufliche Interessengebiete' },
          icon: 'sparkles',
          content: { tr: '<ul><li>Cerrahi ve estetik diş tedavileri</li><li>Diş eti tedavileri</li><li>Gömülü 20 yaş diş çekimleri</li><li>Estetik dolgu uygulamaları</li><li>İmplantoloji uygulamaları</li></ul>', en: '<ul><li>Surgical and aesthetic dental treatments</li><li>Treatment of gum diseases</li><li>Impacted wisdom tooth extractions</li><li>Aesthetic filling applications</li><li>Implantology applications</li></ul>', de: '<ul><li>Chirurgische und ästhetische Zahnbehandlungen</li><li>Behandlung von Zahnfleischerkrankungen</li><li>Extraktionen impaktierter Weisheitszähne</li><li>Ästhetische Füllungsanwendungen</li><li>Implantologie-Anwendungen</li></ul>' }
        },
        {
          title: { tr: 'Sertifikalar ve Kurslar', en: 'Certificates and Courses', de: 'Zertifikate und Kurse' },
          icon: 'clipboard',
          content: { tr: '<ul><li>İmplantoloji Sertifikası</li><li>Estetik Dolgu Kursu</li></ul>', en: '<ul><li>Implantology Certificate</li><li>Aesthetic Filling Course</li></ul>', de: '<ul><li>Implantologie-Zertifikat</li><li>Kurs für ästhetische Füllungen</li></ul>' }
        }
      ]
    }
  },
  {
    id: 'dt-seher-kocabas',
    name: 'Seher Kocabaş',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnärztin' },
    imageUrl: 'https://i.imgur.com/xTmji2A.jpeg',
    bio: { 
      tr: 'Sivas Cumhuriyet Üniversitesi mezunu, gülüş tasarımı ve implant cerrahisi başta olmak üzere estetik diş hekimliği alanında yetkin bir profesyoneldir.',
      en: 'A graduate of Sivas Cumhuriyet University, a competent professional in aesthetic dentistry, especially in smile design and implant surgery.',
      de: 'Absolventin der Sivas Cumhuriyet Universität, eine kompetente Fachfrau für ästhetische Zahnheilkunde, insbesondere für Smile Design und Implantatchirurgie.'
    },
    details: {
      introduction: {
        tr: 'Sivas Cumhuriyet Üniversitesi Diş Hekimliği Fakültesi 2021 yılı mezunu, özellikle estetik diş hekimliği alanında yetkinliğe sahip bir profesyoneldir. Hasta memnuniyetini daima ön planda tutarak, estetik ve fonksiyonel açıdan başarılı sonuçlar elde etmeyi hedefler. Güncel tedavi yöntemlerini ve teknolojik yenilikleri sürekli takip ederek mesleki gelişimini sürdürmektedir.',
        en: 'A 2021 graduate of Sivas Cumhuriyet University Faculty of Dentistry, a professional with proficiency particularly in the field of aesthetic dentistry. She always prioritizes patient satisfaction and aims to achieve aesthetically and functionally successful results. She continuously maintains her professional development by following current treatment methods and technological innovations.',
        de: 'Eine Absolventin der Fakultät für Zahnmedizin der Sivas Cumhuriyet Universität aus dem Jahr 2021, eine Fachfrau mit besonderer Kompetenz auf dem Gebiet der ästhetischen Zahnheilkunde. Sie stellt die Patientenzufriedenheit stets in den Vordergrund und zielt darauf ab, ästhetisch und funktionell erfolgreiche Ergebnisse zu erzielen. Sie setzt ihre berufliche Entwicklung fort, indem sie aktuelle Behandlungsmethoden und technologische Innovationen kontinuierlich verfolgt.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: { tr: '<ul><li>Sivas Cumhuriyet Üniversitesi – Diş Hekimliği Fakültesi (2021)</li></ul>', en: '<ul><li>Sivas Cumhuriyet University – Faculty of Dentistry (2021)</li></ul>', de: '<ul><li>Universität Sivas Cumhuriyet – Fakultät für Zahnmedizin (2021)</li></ul>' }
        },
        {
          title: { tr: 'Deneyim', en: 'Experience', de: 'Erfahrung' },
          icon: 'briefcase',
          content: { tr: '<ul><li>Estetik Diş Hekimliği – Gülüş tasarımı, diş beyazlatma (bleaching), porselen ve zirkonyum kaplama uygulamaları</li><li>İmplantoloji ve Cerrahi – İmplant cerrahisi, implant üstü protez planlaması, diş çekimi ve temel yumuşak doku cerrahisi</li><li>Endodonti ve Restoratif Tedaviler – Kök kanal tedavisi ve modern dolgu uygulamaları</li></ul>', en: '<ul><li>Aesthetic Dentistry – Smile design, teeth whitening (bleaching), porcelain and zirconium crown applications</li><li>Implantology and Surgery – Implant surgery, implant-supported prosthesis planning, tooth extraction, and basic soft tissue surgery</li><li>Endodontics and Restorative Treatments – Root canal treatment and modern filling applications</li></ul>', de: '<ul><li>Ästhetische Zahnheilkunde – Smile Design, Zahnaufhellung (Bleaching), Porzellan- und Zirkoniumkronenanwendungen</li><li>Implantologie und Chirurgie – Implantatchirurgie, Planung von implantatgetragenen Prothesen, Zahnextraktion und grundlegende Weichgewebschirurgie</li><li>Endodontie und restaurative Behandlungen – Wurzelkanalbehandlung und moderne Füllungsanwendungen</li></ul>' }
        },
        {
          title: { tr: 'Mesleki İlgi Alanları', en: 'Areas of Professional Interest', de: 'Berufliche Interessengebiete' },
          icon: 'sparkles',
          content: { tr: '<ul><li>Gülüş tasarımı</li><li>Porselen ve Zirkonyum Kronlar</li><li>İmplant cerrahisi ve implant üstü protezler</li><li>Diş beyazlatma işlemleri</li><li>Yumuşak doku estetiği</li><li>Kanal tedavisi</li></ul>', en: '<ul><li>Smile design</li><li>Porcelain and Zirconium Crowns</li><li>Implant surgery and implant-supported prostheses</li><li>Teeth whitening procedures</li><li>Soft tissue aesthetics</li><li>Root canal treatment</li></ul>', de: '<ul><li>Smile Design</li><li>Porzellan- und Zirkoniumkronen</li><li>Implantatchirurgie und implantatgetragene Prothesen</li><li>Zahnaufhellungsverfahren</li><li>Weichgewebsästhetik</li><li>Wurzelkanalbehandlung</li></ul>' }
        }
      ]
    }
  },
  {
    id: 'dt-ugurcan-dagalp',
    name: 'Uğurcan Dağalp',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnarzt' },
    imageUrl: 'https://i.imgur.com/vvLPvpP.jpeg',
    bio: { 
      tr: 'Süleyman Demirel Üniversitesi Diş Hekimliği Fakültesi\'nden 2019 yılında mezun olmuştur. Mesleki tecrübesiyle hastalarımıza modern ve etkili tedavi çözümleri sunmaktadır.',
      en: 'Graduated from Süleyman Demirel University Faculty of Dentistry in 2019. With his professional experience, he offers modern and effective treatment solutions to our patients.',
      de: 'Absolvierte 2019 die Fakultät für Zahnmedizin der Süleyman Demirel Universität. Mit seiner Berufserfahrung bietet er unseren Patienten moderne und wirksame Behandlungslösungen.'
    },
    details: {
      introduction: {
        tr: 'Süleyman Demirel Üniversitesi Diş Hekimliği Fakültesi\'nden 2019 yılında mezun olmuştur. Mesleki tecrübesiyle hastalarımıza modern ve etkili tedavi çözümleri sunmaktadır.',
        en: 'Graduated from Süleyman Demirel University Faculty of Dentistry in 2019. With his professional experience, he offers modern and effective treatment solutions to our patients.',
        de: 'Absolvierte 2019 die Fakultät für Zahnmedizin der Süleyman Demirel Universität. Mit seiner Berufserfahrung bietet er unseren Patienten moderne und wirksame Behandlungslösungen.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: { 
            tr: '<ul><li>Süleyman Demirel Üniversitesi – Diş Hekimliği Fakültesi (2019)</li></ul>', 
            en: '<ul><li>Süleyman Demirel University – Faculty of Dentistry (2019)</li></ul>', 
            de: '<ul><li>Süleyman Demirel Universität – Fakultät für Zahnmedizin (2019)</li></ul>' 
          }
        }
      ]
    }
  },
  {
    id: 'dt-furkan-akyildiz',
    name: 'Furkan Akyıldız',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnarzt' },
    imageUrl: 'https://i.imgur.com/k61SlfE.jpeg',
    bio: { 
      tr: 'Ankara Yıldırım Beyazıt Üniversitesi mezunu, estetik ve restoratif tedavilere odaklanmış genç ve dinamik bir diş hekimidir.',
      en: 'A young and dynamic dentist, graduate of Ankara Yıldırım Beyazıt University, focused on aesthetic and restorative treatments.',
      de: 'Ein junger und dynamischer Zahnarzt, Absolvent der Ankara Yıldırım Beyazıt Universität, spezialisiert auf ästhetische und restaurative Behandlungen.'
    },
    details: {
      introduction: {
        tr: 'Ankara Yıldırım Beyazıt Üniversitesi Diş Hekimliği Fakültesi mezunu, genç ve dinamik diş hekimi. Özellikle estetik diş hekimliği ve restoratif tedaviler alanında kendini geliştirmeye odaklanmıştır. Hasta memnuniyetini önceliklendiren, modern diş hekimliği teknolojilerini ve güncel tedavi yaklaşımlarını yakından takip eden, iletişimi güçlü bir profesyoneldir.',
        en: 'A young and dynamic dentist, graduate of Ankara Yıldırım Beyazıt University Faculty of Dentistry. He is particularly focused on improving himself in the fields of aesthetic dentistry and restorative treatments. A professional with strong communication skills who prioritizes patient satisfaction and closely follows modern dental technologies and current treatment approaches.',
        de: 'Ein junger und dynamischer Zahnarzt, Absolvent der Fakultät für Zahnmedizin der Ankara Yıldırım Beyazıt Universität. Er konzentriert sich besonders auf die Weiterentwicklung in den Bereichen ästhetische Zahnheilkunde und restaurative Behandlungen. Ein Profi mit starken Kommunikationsfähigkeiten, der die Zufriedenheit der Patienten priorisiert und moderne zahnmedizinische Technologien und aktuelle Behandlungsansätze genau verfolgt.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: { tr: '<ul><li>Ankara Yıldırım Beyazıt Üniversitesi – Diş Hekimliği Fakültesi (2023)</li></ul>', en: '<ul><li>Ankara Yıldırım Beyazıt University – Faculty of Dentistry (2023)</li></ul>', de: '<ul><li>Universität Ankara Yıldırım Beyazıt – Fakultät für Zahnmedizin (2023)</li></ul>' }
        },
        {
          title: { tr: 'Deneyim ve Klinik Yetkinlikler', en: 'Experience and Clinical Competencies', de: 'Erfahrung und klinische Kompetenzen' },
          icon: 'briefcase',
          content: { tr: 'Üniversite eğitimi süresince yoğun staj ve klinik uygulama programları aracılığıyla, aşağıdaki alanlarda pratik deneyim kazanmıştır:<ul><li>Restoratif Diş Tedavileri – Estetik dolgu, inley ve onley uygulamaları</li><li>Endodonti – Kök kanal tedavisi prosedürleri</li><li>Periodontoloji – Temel diş eti hastalıkları tedavisi ve diş taşı temizliği</li><li>Koruyu Hekimlik – Fissür örtücü ve florür uygulamaları</li></ul>', en: '<ul><li>Restorative Dental Treatments – Aesthetic fillings, inlay, and onlay applications</li><li>Endodontics – Root canal treatment procedures</li><li>Periodontology – Basic gum disease treatment and tartar cleaning</li><li>Preventive Dentistry – Fissure sealant and fluoride applications</li></ul>', de: '<ul><li>Restaurative Zahnbehandlungen – Ästhetische Füllungen, Inlay- und Onlay-Anwendungen</li><li>Endodontie – Wurzelkanalbehandlungsverfahren</li><li>Parodontologie – Grundlegende Behandlung von Zahnfleischerkrankungen und Zahnsteinentfernung</li><li>Präventivzahnmedizin – Fissurenversiegelung und Fluoridanwendungen</li></ul>' }
        },
        {
          title: { tr: 'Mesleki İlgi Alanları', en: 'Areas of Professional Interest', de: 'Berufliche Interessengebiete' },
          icon: 'sparkles',
          content: { tr: '<ul><li>Estetik dolgu uygulamaları (Kompozit)</li><li>Kompozit lamina ve bonding uygulamaları</li><li>Diş beyazlatma (Bleaching) işlemleri</li><li>Koruyucu ve önleyici diş hekimliği</li></ul>', en: '<ul><li>Aesthetic filling applications (Composite)</li><li>Composite laminate and bonding applications</li><li>Teeth whitening (Bleaching) procedures</li><li>Preventive and prophylactic dentistry</li></ul>', de: '<ul><li>Ästhetische Füllungsanwendungen (Komposit)</li><li>Kompositlaminat- und Bonding-Anwendungen</li><li>Zahnaufhellungsverfahren (Bleaching)</li><li>Präventive und prophylaktische Zahnheilkunde</li></ul>' }
        }
      ]
    }
  },
  {
    id: 'dt-busra-beyhan',
    name: 'Büşra Beyhan',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnärztin' },
    imageUrl: 'https://i.imgur.com/01M1haK.jpeg',
    bio: { 
      tr: 'Ankara Gazi Üniversitesi mezunu, estetik restorasyonlar ve çocuk diş hekimliği konularında ilgili, iletişimi güçlü bir hekimdir.',
      en: 'A graduate of Ankara Gazi University, she is a communicative physician interested in aesthetic restorations and pediatric dentistry.',
      de: 'Absolventin der Universität Ankara Gazi, eine kommunikative Ärztin mit Interesse an ästhetischen Restaurationen und Kinderzahnheilkunde.'
    },
    details: {
      introduction: {
        tr: '2023 yılında Ankara Gazi Üniversitesi Diş Hekimliği Fakültesi\'nden mezun olmuştur. Mesleki pratiğinde güncel yaklaşımları takip eden, özellikle estetik uygulamalar ve çocuk diş hekimliği alanlarında hassasiyetle çalışan bir hekimdir. Mezuniyet öncesi ve sonrası katıldığı eğitimlerle mesleki gelişimini sürekli kılmaktadır.',
        en: 'She graduated from Ankara Gazi University Faculty of Dentistry in 2023. She is a physician who follows current approaches in her professional practice and works with precision, especially in aesthetic applications and pediatric dentistry. She maintains her professional development through trainings attended before and after graduation.',
        de: 'Sie absolvierte 2023 die Fakultät für Zahnmedizin der Universität Ankara Gazi. Sie ist eine Ärztin, die in ihrer beruflichen Praxis aktuelle Ansätze verfolgt und insbesondere in den Bereichen ästhetische Anwendungen und Kinderzahnheilkunde präzise arbeitet. Durch Fortbildungen vor und nach dem Studium hält sie ihre berufliche Entwicklung aufrecht.'
      },
      sections: [
        {
          title: { tr: 'Eğitim', en: 'Education', de: 'Ausbildung' },
          icon: 'academic',
          content: { 
            tr: '<ul><li>Ankara Gazi Üniversitesi – Diş Hekimliği Fakültesi (2023)</li></ul>', 
            en: '<ul><li>Ankara Gazi University – Faculty of Dentistry (2023)</li></ul>', 
            de: '<ul><li>Universität Ankara Gazi – Fakultät für Zahnmedizin (2023)</li></ul>' 
          }
        },
        {
          title: { tr: 'Deneyim ve İlgi Alanları', en: 'Experience and Interests', de: 'Erfahrung und Interessen' },
          icon: 'briefcase',
          content: { 
            tr: '<ul><li>Anterior Diastemaların (Ön diş aralıkları) Direk Estetik Restorasyonu</li><li>Gülüş Tasarımı</li><li>Kanal Tedavisi ve Retreatment (Kanal yenileme)</li><li>İmplant Üstü Protez Uygulamaları</li><li>Diş Çekimi ve Beyazlatma</li><li>Porselen ve Zirkonyum Kaplamalar</li></ul>', 
            en: '<ul><li>Direct Aesthetic Restoration of Anterior Diastemas</li><li>Smile Design</li><li>Root Canal Treatment and Retreatment</li><li>Implant-Supported Prosthesis Applications</li><li>Tooth Extraction and Whitening</li><li>Porcelain and Zirconium Veneers</li></ul>', 
            de: '<ul><li>Direkte ästhetische Restauration von Frontzahndiastemata</li><li>Lächel-Design</li><li>Wurzelkanalbehandlung und Revision</li><li>Implantatgetragene Prothesenanwendungen</li><li>Zahnextraktion und Bleaching</li><li>Porzellan- und Zirkonkronen</li></ul>' 
          }
        },
        {
          title: { tr: 'Çocuk Diş Hekimliği Yaklaşımı', en: 'Pediatric Dentistry Approach', de: 'Ansatz der Kinderzahnheilkunde' },
          icon: 'sparkles',
          content: { 
            tr: 'Çocuk hastaların diş hekimi korkularını yenmelerine yardımcı olmak, güvenlerini kazanmak ve tedavi sürecini keyifli bir deneyime dönüştürmek öncelikli hedeflerinden biridir.', 
            en: 'Helping pediatric patients overcome their fear of the dentist, gaining their trust, and turning the treatment process into a pleasant experience are among her primary goals.', 
            de: 'Kindern zu helfen, ihre Angst vor dem Zahnarzt zu überwinden, ihr Vertrauen zu gewinnen und den Behandlungsprozess zu einem angenehmen Erlebnis zu machen, gehört zu ihren vorrangigen Zielen.' 
          }
        }
      ]
    }
  },
  {
    id: 'dt-emir-hacioglu',
    name: 'Emir Hacıoğlu',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnarzt' },
    imageUrl: 'https://i.imgur.com/Ey8hFao.jpeg',
    bio: { 
      tr: 'Kliniğimizin değerli hekimlerinden Emir Hacıoğlu, hastalarına kapsamlı diş sağlığı hizmetleri sunarak, sağlıklı gülüşlere kavuşmalarına yardımcı olmaktadır.',
      en: 'One of the valuable dentists of our clinic, Emir Hacıoğlu provides comprehensive dental health services to his patients, helping them achieve healthy smiles.',
      de: 'Als einer der wertvollen Zahnärzte unserer Klinik bietet Emir Hacıoğlu seinen Patienten umfassende zahnärztliche Dienstleistungen an und hilft ihnen, ein gesundes Lächeln zu erlangen.'
    },
    details: {
      introduction: {
        tr: 'Kliniğimizin değerli hekimlerinden Emir Hacıoğlu, hastalarına kapsamlı diş sağlığı hizmetleri sunarak, sağlıklı gülüşlere kavuşmalarına yardımcı olmaktadır.',
        en: 'One of the valuable dentists of our clinic, Emir Hacıoğlu provides comprehensive dental health services to his patients, helping them achieve healthy smiles.',
        de: 'Als einer der wertvollen Zahnärzte unserer Klinik bietet Emir Hacıoğlu seinen Patienten umfassende zahnärztliche Dienstleistungen an und hilft ihnen, ein gesundes Lächeln zu erlangen.'
      },
      sections: []
    }
  },
  {
    id: 'dt-senem-koc',
    name: 'Senem Koç',
    title: { tr: 'Diş Hekimi', en: 'Dentist', de: 'Zahnärztin' },
    imageUrl: '/images/doctors/senem-koc.png',
    bio: { 
      tr: 'Estetik diş hekimliği ve koruyucu diş sağlığı konularında uzmanlaşmış, güler yüzlü ve deneyimli hekimimiz.',
      en: 'Specialized in aesthetic dentistry and preventive dental health, our friendly and experienced dentist.',
      de: 'Spezialisiert auf ästhetische Zahnheilkunde und präventive Zahngesundheit, unsere freundliche und erfahrene Zahnärztin.'
    },
    details: {
      introduction: {
        tr: 'Senem Koç, kliniğimizde diş hekimi olarak görev yapmakta olup estetik diş hekimliği, restoratif tedaviler ve koruyucu diş sağlığı alanlarında hastalarına nitelikli ve özenli hizmet sunmaktadır.',
        en: 'Senem Koç serves as a dentist in our clinic, providing qualified and meticulous service to her patients in the fields of aesthetic dentistry, restorative treatments, and preventive dental health.',
        de: 'Senem Koç ist als Zahnärztin in unserer Klinik tätig und bietet ihren Patienten qualifizierten und sorgfältigen Service in den Bereichen ästhetische Zahnheilkunde, restaurative Behandlungen und präventive Zahngesundheit.'
      },
      sections: []
    }
  }
];
