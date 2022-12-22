import { Flex } from '@chakra-ui/react';

import { ROW_GAP } from '~/features/employee/employee.styles';

export const EducationSection = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <Flex
    flexDirection="column"
    gap="20px"
    paddingRight="40px"
    borderBottom="1px solid var(--chakra-colors-brand-stroke)"
    position="relative"
  >
    <Flex
      flexDirection="column"
      gap={ROW_GAP}
    >
      {children}
    </Flex>
  </Flex>
);
