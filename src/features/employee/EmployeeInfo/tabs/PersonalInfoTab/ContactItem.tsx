import { Box, Flex, Link, Text } from '@chakra-ui/react';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { getPrefixedHref, type LinkType } from '~/shared/utils/links.utils';

export const ContactItem = ({
  name,
  values,
  linkType
}: {
  name: string;
  values?: string[];
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
      {(values || []).map((contact) =>
        linkType ? (
          <Link
            key={contact}
            href={getPrefixedHref(contact, linkType)}
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
