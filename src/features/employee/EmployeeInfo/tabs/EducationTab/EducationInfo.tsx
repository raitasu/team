import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type ChangedEmployeeEducationInfoValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { EditEducationInfoModal } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfoModal';
import { Button } from '~/shared/ui/components/Button';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

import { EducationInfoItem } from './EducationInfoItem';
import { EducationSection } from './EducationSection';
import { InfoSection } from '../components/InfoSection';

export const EducationInfo = ({
  educations,
  employeeId
}: {
  educations: EmployeeEducation[];
  employeeId: number;
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
          <Flex justifyContent="space-between">
            <EducationInfoItem education={education} />
            <EditEducationInfoModal
              employeeId={employeeId}
              education={education}
              onConfirm={changeEducationInfo}
            />
          </Flex>
        </EducationSection>
      ))}

      <InfoSection>
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
