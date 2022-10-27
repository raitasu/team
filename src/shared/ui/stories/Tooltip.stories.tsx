import { Box, SimpleGrid } from '@chakra-ui/react';

import { Tooltip } from '../components/Tooltip';

export default {
  title: 'UI/Tooltips',
  component: Tooltip
};

export const Variants = ({ ...argTypes }) => (
  <SimpleGrid
    w="700px"
    margin="40px"
    paddingBottom="100px"
    paddingLeft="100px"
    columns={3}
    spacingX="20px"
    spacingY="40px"
    justifyItems="center"
  >
    <Tooltip
      hasArrow
      {...argTypes}
    >
      <Box>Hover me on, please</Box>
    </Tooltip>
  </SimpleGrid>
);
