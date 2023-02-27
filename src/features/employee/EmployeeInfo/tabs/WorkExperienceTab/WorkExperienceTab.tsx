import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { Button } from '~/shared/ui/components/Button';

import { CreateNewWorkExperienceModal } from './modals/CreateNewWorkExperience/CreateNewWorkExperienceModal';
import { WorkExperienceInfo } from './WorkExperienceInfo';
import { InfoSection } from '../components/InfoSection';

export const WorkExperienceTab: EmployeeInfoTab = ({
  employee: { work_experiences: workExperiences, hired_at: hiredAt },
  canEdit
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenCreateNewWorkExperienceModal,
    onOpen: onOpenCreateNewWorkExperienceModal,
    onClose: onCloseCreateNewWorkExperienceModal
  } = useDisclosure();

  return (
    <Box>
      {workExperiences?.length ? (
        workExperiences.map((workExperience) => (
          <WorkExperienceInfo
            hiredAt={hiredAt || ''}
            key={workExperience.id}
            workExperience={workExperience}
            canEdit={canEdit}
          />
        ))
      ) : (
        <InfoSection title={t(`domains:cv.blocks.work_experiences`)}>
          <Text color="brand.lightGray">
            {t('domains:employee.errors.no_data')}
          </Text>
        </InfoSection>
      )}
      {canEdit && (
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
            hiredAt={hiredAt}
            isOpenCreateNewWorkExperienceModal={
              isOpenCreateNewWorkExperienceModal
            }
            onCloseCreateNewWorkExperienceModal={
              onCloseCreateNewWorkExperienceModal
            }
          />
        </InfoSection>
      )}
    </Box>
  );
};
