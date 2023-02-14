import { type ReactElement } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH
} from '~/features/employee/employee.styles';

export const GeneralInfoItem = ({
  name,
  value
}: {
  name: string;
  value: string | ReactElement;
}) => (
  <Flex gap={COLUMN_GAP}>
    <Text
      width={LEFT_COLUMN_WIDTH}
      color="brand.headline2"
      flexShrink="0"
    >
      {name}
    </Text>
    <Text textAlign="justify">{value}</Text>
  </Flex>
);
