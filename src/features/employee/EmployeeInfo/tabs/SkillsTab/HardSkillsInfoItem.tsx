import { Flex, Text } from '@chakra-ui/react';

import { GAP_BETWEEN_SKILL_AND_DATE } from '~/features/employee/employee.styles';
import { type HardSkill } from '~/store/api/employees/employees.types';

export const HardSkillsInfoItem = ({ skill }: { skill: HardSkill }) => (
  <Flex gap={GAP_BETWEEN_SKILL_AND_DATE}>
    <Text>{skill.name}</Text>
  </Flex>
);
