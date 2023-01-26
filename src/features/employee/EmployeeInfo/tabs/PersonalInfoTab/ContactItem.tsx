import { Box, Flex, Link, Text } from '@chakra-ui/react';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { getPrefixedHref, type LinkType } from '~/shared/utils/links.utils';

export const ContactItem = ({
  name,
  link,
  linkType
}: {
  name?: string;
  link?: string;
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
      {linkType ? (
        <Link
          href={getPrefixedHref(link || '', linkType)}
          target="_blank"
        >
          <Text>{link}</Text>
        </Link>
      ) : (
        <Text>{link}</Text>
      )}
    </Flex>
    <Box />
  </Flex>
);
