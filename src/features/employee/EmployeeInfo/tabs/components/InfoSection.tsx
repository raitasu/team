import { Flex, Heading } from '@chakra-ui/react';

import { ROW_GAP, SECTION_PADDING } from '~/features/employee/employee.styles';

export const InfoSection = ({
  title,
  children
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <Flex
    flexDirection="column"
    gap="20px"
    p={SECTION_PADDING}
    borderBottom="1px solid var(--chakra-colors-brand-stroke)"
  >
    {title ? (
      <Heading
        variant="4"
        textTransform="uppercase"
      >
        {title}
      </Heading>
    ) : null}

    <Flex
      flexDirection="column"
      gap={ROW_GAP}
    >
      {children}
    </Flex>
  </Flex>
);
