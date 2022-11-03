import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const SickLeave = () => {
  const [t] = useTranslation();

  return (
    <Box bg="brand.white">
      <Heading variant="3">{t('navigation:onboarding.sick_leave')}</Heading>
    </Box>
  );
};
