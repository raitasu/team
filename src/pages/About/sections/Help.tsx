import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import { Subsection, Paragraph, AboutLink } from './sections.styled';

export const Help = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.help')}</Heading>
      </VisuallyHidden>

      <Subsection as="div">
        <Paragraph style={{ marginBottom: '10px' }}>
          <Trans i18nKey="text:about.help.contact">
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
          {t('text:about.help.discord')}
        </Paragraph>
        <Paragraph>{t('text:about.help.mentor')}</Paragraph>
      </Subsection>
    </Box>
  );
};