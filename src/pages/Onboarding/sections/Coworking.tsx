import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { CoworkingLocation } from '../CoworingLocation';
import { Subsection, Subtitle, Paragraph } from './sections.styled';

export const Coworking = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.coworking')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.coworking.minsk')}</Subtitle>

        <Paragraph>{t('text:onboarding.coworking.minsk.location')}</Paragraph>
        <Paragraph>
          {t('text:onboarding.coworking.minsk.coworking_day')}
        </Paragraph>
        <Paragraph>{t('text:onboarding.coworking.minsk.place')}</Paragraph>

        <Box>
          <CoworkingLocation />
        </Box>
      </Subsection>
    </Box>
  );
};
