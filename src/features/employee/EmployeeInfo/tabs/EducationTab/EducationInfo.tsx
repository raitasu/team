import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { EducationInfoItem } from './EducationInfoItem';
import { EducationSection } from './EducationSection';

export const EducationInfo = ({
  educations
}: {
  educations: EmployeeEducation[];
}) => {
  const [t] = useTranslation();

  return (
    <>
      <EducationSection title={t('titles:employee.tabs.education.title')}>
        {educations.map((education) => (
          <EducationInfoItem
            key={education.id}
            education={education}
          />
        ))}
      </EducationSection>
      <InfoSection>
        <Button
          variant="primaryOutline"
          outline="none"
          boxShadow="none"
          leftIcon={<MdAdd />}
          margin="auto"
        >
          {t('actions:employee.add_education')}
        </Button>
      </InfoSection>
    </>
  );
};
