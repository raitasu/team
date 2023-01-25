import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { Button } from '~/shared/ui/components/Button';

import { WorkExperienceInfo } from './WorkExperienceInfo';
import { InfoSection } from '../components/InfoSection';

export const WorkExperienceTab: EmployeeInfoTab = ({ employee }) => {
  const { work_experiences: workExperiences } = employee;

  const [t] = useTranslation();

  return (
    <Box>
      {workExperiences ? (
        <>
          {workExperiences.map((workExperience) => (
            <WorkExperienceInfo
              key={workExperience.id}
              workExperience={workExperience}
            />
          ))}
        </>
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      <InfoSection>
        <Button
          variant="primaryOutline"
          outline="none"
          boxShadow="none"
          leftIcon={<MdAdd />}
          margin="auto"
        >
          {t('domains:employee.actions.add_work_experience')}
        </Button>
      </InfoSection>
    </Box>
  );
};
