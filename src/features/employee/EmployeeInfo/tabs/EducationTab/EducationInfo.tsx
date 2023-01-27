import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { type ChangedEmployeeEducationInfoValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { EditEducationInfoModal } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfoModal';
import { Button } from '~/shared/ui/components/Button';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

import { EducationInfoItem } from './EducationInfoItem';
import { EducationSection } from './EducationSection';
import { InfoSection } from '../components/InfoSection';

export const EducationInfo = ({
  educations,
  canEdit
}: {
  educations: EmployeeEducation[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const changeEducationInfo = (values: ChangedEmployeeEducationInfoValues) => {
    console.debug(values);
  };

  return (
    <>
      <Heading
        variant="4"
        textTransform="uppercase"
        padding="40px 40px 0 40px"
      >
        {t('domains:employee.titles.profile_tabs.education.title')}
      </Heading>

      {educations.map((education) => (
        <EducationSection key={education.id}>
          <Flex
            justifyContent="space-between"
            padding={SECTION_PADDING}
          >
            <EducationInfoItem education={education} />

            <EditEducationInfoModal
              education={education}
              onConfirm={changeEducationInfo}
              canEdit={canEdit}
            />
          </Flex>
        </EducationSection>
      ))}

      <InfoSection style={{ gap: 0 }}>
        <Button
          variant="primaryOutline"
          outline="none"
          boxShadow="none"
          leftIcon={<MdAdd />}
          margin="auto"
        >
          {t('domains:employee.actions.add_education')}
        </Button>
      </InfoSection>
    </>
  );
};
