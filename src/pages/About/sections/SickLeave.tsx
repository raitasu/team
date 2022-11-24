import { Heading, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  AboutLink,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from './sections.styled';

export const SickLeave = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.sick_leave')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.sick_leave.sick_leave')}</Subtitle>

        <Paragraph>{t('text:about.sick_leave.question')}</Paragraph>

        <Paragraph>
          <Trans i18nKey="text:about.sick_leave.help">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
