import { Box, Flex } from '@chakra-ui/react';

import { LanguageField } from '~/features/employees/Filters/Fields/LanguageField';
import { LanguageLevelField } from '~/features/employees/Filters/Fields/LanguageLevelField';

export const LanguageSection = ({ index }: { index: number }) => (
  <Flex justifyContent="space-between">
    <Box w="130px">
      <LanguageField index={index} />
    </Box>
    <Box w="130px">
      <LanguageLevelField index={index} />
    </Box>
  </Flex>
);
