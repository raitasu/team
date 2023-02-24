import { useMemo } from 'react';

import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

import { HardSkillsInfo } from './HardSkillsInfo';
import { LanguagesInfo } from './LanguagesInfo';
import { SoftSkillsInfo } from './SoftSkillsInfo';

export const SkillsTab: EmployeeInfoTab = ({ employee, canEdit }) => {
  const [t] = useTranslation();

  const sortedEmployeeSkills = useMemo(
    () =>
      employee.soft_skills?.slice().sort((a, b) => (a.name > b.name ? 1 : -1)),
    [employee.soft_skills]
  );

  return (
    <Box>
      {employee.employee_hard_skill_permissions ? (
        <HardSkillsInfo
          skills={employee.employee_hard_skill_permissions}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      {sortedEmployeeSkills ? (
        <SoftSkillsInfo
          skills={sortedEmployeeSkills}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      {employee.languages ? (
        <LanguagesInfo
          languages={employee.languages}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
    </Box>
  );
};
