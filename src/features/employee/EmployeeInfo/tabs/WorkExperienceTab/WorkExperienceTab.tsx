import { Box, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { Button } from '~/shared/ui/components/Button';

import { CreateNewWorkExperienceModal } from './modals/CreateNewWorkExperience/CreateNewWorkExperienceModal';
import { WorkExperienceInfo } from './WorkExperienceInfo';
import { InfoSection } from '../components/InfoSection';

export const WorkExperienceTab: EmployeeInfoTab = ({ employee }) => {
  const { work_experiences: workExperiences, id, hired_at } = employee;

  const [t] = useTranslation();

  const {
    isOpen: isOpenCreateNewWorkExperienceModal,
    onOpen: onOpenCreateNewWorkExperienceModal,
    onClose: onCloseCreateNewWorkExperienceModal
  } = useDisclosure();

  return (
    <Box>
      {workExperiences && hired_at ? (
        <>
          {workExperiences.map((workExperience) => (
            <WorkExperienceInfo
              hiredAt={hired_at}
              employeeId={id}
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
          onClick={onOpenCreateNewWorkExperienceModal}
        >
          {t('domains:employee.actions.add_work_experience')}
        </Button>
        <CreateNewWorkExperienceModal
          hiredAt={hired_at}
          isOpenCreateNewWorkExperienceModal={
            isOpenCreateNewWorkExperienceModal
          }
          onCloseCreateNewWorkExperienceModal={
            onCloseCreateNewWorkExperienceModal
          }
        />
      </InfoSection>
    </Box>
  );
};
