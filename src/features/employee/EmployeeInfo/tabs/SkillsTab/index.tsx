import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type Employee } from '~/store/api/employees/employees.types';

import { HardSkillsInfo } from './HardSkillsInfo';
import { LanguagesInfo } from './LanguagesInfo';
import { SoftSkillsInfo } from './SoftSkillsInfo';

export const SkillsTab = ({ employee }: { employee: Employee }) => {
  const [t] = useTranslation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const canEdit = isEditable(employee.id, currentUser);

  return (
    <Box>
      {employee.employee_hard_skill_permissions ? (
        <HardSkillsInfo
          skills={employee.employee_hard_skill_permissions}
          employeeId={employee.id}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      {employee.soft_skills ? (
        <SoftSkillsInfo
          skills={employee.soft_skills}
          employeeId={employee.id}
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
