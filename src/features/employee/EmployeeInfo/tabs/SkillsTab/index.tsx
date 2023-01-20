import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type Employee } from '~/store/api/employees/employees.types';

import { HardSkillsInfo } from './HardSkillsInfo';
import { LanguagesInfo } from './LanguagesInfo';
import { SoftSkillsInfo } from './SoftSkillsInfo';

export const SkillsTab = ({ employee }: { employee: Employee }) => {
  const [t] = useTranslation();

  return (
    <Box>
      {employee.hard_skills ? (
        <HardSkillsInfo
          skills={employee.hard_skills}
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
        <LanguagesInfo languages={employee.languages} />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
    </Box>
  );
};
