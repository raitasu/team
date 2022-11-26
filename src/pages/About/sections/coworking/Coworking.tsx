import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { CoworkingLocation } from '~/pages/About/sections/coworking/CoworkingLocation';

import {
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from '../sections.styled';

export const Coworking = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">
          {t('navigation:about_sections.coworking')}
        </Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.coworking.minsk')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.coworking.minsk.location')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.coworking.minsk.coworking_day')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.coworking.minsk.place')}
        </Paragraph>

        <Box>
          <CoworkingLocation />
        </Box>
      </Subsection>
    </SectionContainer>
  );
};
