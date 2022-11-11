import { Flex, Heading } from '@chakra-ui/react';

import { SECTION_PADDING } from '~/features/employee/employee.styles';

export const EducationSection = ({
  title,
  children
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <Flex flexDirection="column">
    {title ? (
      <Heading
        variant="4"
        textTransform="uppercase"
        p={SECTION_PADDING}
        pb="0"
      >
        {title}
      </Heading>
    ) : null}

    <Flex flexDirection="column">{children}</Flex>
  </Flex>
);
