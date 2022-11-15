import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Subsection, Subtitle, Paragraph } from './sections.styled';

export const SickLeave = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.sick_leave')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.sick_leave.sick_leave')}</Subtitle>

        <Paragraph>{t('text:onboarding.sick_leave.question')}</Paragraph>
        <Paragraph>{t('text:onboarding.sick_leave.help')}</Paragraph>
      </Subsection>
    </Box>
  );
};
