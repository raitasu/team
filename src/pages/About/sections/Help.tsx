import { Heading, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  AboutLink,
  Paragraph,
  SectionContainer,
  Subsection
} from './sections.styled';

export const Help = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.help')}</Heading>
      </VisuallyHidden>

      <Subsection as="div">
        <Paragraph style={{ marginBottom: '10px' }}>
          <Trans i18nKey="domains:about_sections.text.help.contact">
            <AboutLink
              display="inline"
              target="https://t.me/Kottyashechka"
            >
              Masha
            </AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '10px'
          }}
        >
          {t('domains:about_sections.text.help.discord')}
        </Paragraph>
        <Paragraph>{t('domains:about_sections.text.help.mentor')}</Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
