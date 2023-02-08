import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { GAP_BETWEEN_SKILL_AND_DATE } from '~/features/employee/employee.styles';
import { type HardSkill } from '~/store/api/employees/employees.types';

export const HardSkillsInfoItem = ({ skill }: { skill: HardSkill }) => {
  const [t] = useTranslation();

  return (
    <Flex gap={GAP_BETWEEN_SKILL_AND_DATE}>
      <Text>{skill.name}</Text>
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
