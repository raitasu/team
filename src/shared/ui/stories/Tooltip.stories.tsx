import { Box, SimpleGrid } from '@chakra-ui/react';

import { BaseTooltip } from '../components/Tooltip';

export default {
  title: 'UI/Tooltips',
  component: BaseTooltip
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
    <BaseTooltip
      hasArrow
      {...argTypes}
    >
      <Box>Hover me on, please</Box>
    </BaseTooltip>
  </SimpleGrid>
);
