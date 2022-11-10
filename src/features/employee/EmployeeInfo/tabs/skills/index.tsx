import { Box } from '@chakra-ui/react';

import type { Employee } from '~/shared/store/api/employees/employees.types';

import { HardSkillsInfo } from './HardSkillsInfo';
import { LanguagesInfo } from './LanguagesInfo';
import { SoftSkillsInfo } from './SoftSkillsInfo';

export const SkillsTab = ({ employee }: { employee: Employee }) => (
  <Box>
    <HardSkillsInfo skills={employee.hard_skills} />
    <SoftSkillsInfo skills={employee.soft_skills} />
    <LanguagesInfo languages={employee.languages} />
  </Box>
);
