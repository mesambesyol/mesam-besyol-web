
import React from 'react';
import { DOCTORS_DATA } from '../data/doctors';
import { useLanguage } from '../contexts/LanguageContext';
import SectionTitle from './SectionTitle';
import DoctorCard from './DoctorCard';
import AnimatedItem from './AnimatedItem';
import PageContainer from './PageContainer';

interface RelatedDoctorsProps {
  doctorIds: string[];
}

const RelatedDoctors: React.FC<RelatedDoctorsProps> = ({ doctorIds }) => {
  const { t } = useLanguage();
  const relatedDoctors = DOCTORS_DATA.filter(doctor => doctorIds.includes(doctor.id));

  if (relatedDoctors.length === 0) {
    return null;
  }

  return (
    <AnimatedItem as="section" className="py-16 bg-brand-blue-light overflow-hidden">
      <PageContainer>
        <SectionTitle title={t('serviceDetailPage.relatedDoctorsTitle')} />
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {relatedDoctors.map((doctor, index) => (
            <AnimatedItem 
              key={doctor.id} 
              staggerIndex={index}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              <DoctorCard doctor={doctor} />
            </AnimatedItem>
          ))}
        </div>
      </PageContainer>
    </AnimatedItem>
  );
};

export default RelatedDoctors;
