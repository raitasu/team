import { Box, Flex, Link, Text } from '@chakra-ui/react';

import {
  LEFT_COLUMN_WIDTH,
  COLUMN_GAP,
  ROW_GAP
} from '~/features/employee/employee.styles';

type LinkType = 'phone' | 'email' | 'web';

function getLinkPrefix(type?: LinkType) {
  switch (type) {
    case 'email':
      return 'mailto:';
    case 'phone':
      return 'tel:';
    default:
      return '';
  }
}

export const ContactItem = ({
  name,
  values,
  linkType
}: {
  name: string;
  values: string[];
  linkType?: LinkType;
}) => (
  <Flex gap={COLUMN_GAP}>
    <Text
      width={LEFT_COLUMN_WIDTH}
      color="brand.headline2"
    >
      {name}
    </Text>
    <Flex
      flexDirection="column"
      gap={ROW_GAP}
    >
      {values.map((contact) =>
        linkType ? (
          <Link
            key={contact}
            href={`${getLinkPrefix(linkType)}${contact}`}
            target="_blank"
          >
            <Text>{contact}</Text>
          </Link>
        ) : (
          <Text key={contact}>{contact}</Text>
        )
      )}
    </Flex>
    <Box />
  </Flex>
);
