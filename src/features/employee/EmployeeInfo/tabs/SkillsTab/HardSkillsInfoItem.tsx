import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { GAP_BETWEEN_SKILL_AND_DATE } from '~/features/employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type HardSkill } from '~/store/api/employees/employees.types';

export const HardSkillsInfoItem = ({ skill }: { skill: HardSkill }) => {
  const [t, { language }] = useTranslation();

  return (
    <Flex gap={GAP_BETWEEN_SKILL_AND_DATE}>
      <Text>{getTranslation(skill.name_translations, language)}</Text>
      <Text color="brand.lightGray">
        (
        {t('domains:employee.titles.experience', {
          count: skill.years_of_experience
        })}
        )
      </Text>
    </Flex>
  );
};
