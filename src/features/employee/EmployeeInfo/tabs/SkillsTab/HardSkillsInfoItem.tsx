import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/pages/Employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type EmployeeHardSkill } from '~/shared/store/api/employees/employees.types';

export const HardSkillsInfoItem = ({ skill }: { skill: EmployeeHardSkill }) => {
  const [t, { language }] = useTranslation();

  return (
    <Flex gap={COLUMN_GAP}>
      <Text flex="1">{getTranslation(skill.name_translations, language)}</Text>
      <Text
        flex="1"
        color="brand.lightGray"
      >
        {t('titles:employee.experience', {
          count: skill.years_of_experience
        })}
      </Text>
    </Flex>
  );
};
