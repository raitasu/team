import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

import { HardSkillsInfo } from './HardSkillsInfo';
import { LanguagesInfo } from './LanguagesInfo';
import { SoftSkillsInfo } from './SoftSkillsInfo';

export const SkillsTab: EmployeeInfoTab = ({ employee, canEdit }) => {
  const [t] = useTranslation();

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
      {employee.soft_skills ? (
        <SoftSkillsInfo
          skills={employee.soft_skills}
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
