import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import { Subsection, Paragraph, OnboardingLink } from './sections.styled';

export const Help = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.help')}</Heading>
      </VisuallyHidden>

      <Subsection as="div">
        <Paragraph style={{ marginBottom: '10px' }}>
          <Trans i18nKey="text:onboarding.help.contact">
            <OnboardingLink
              display="inline"
              target="https://t.me/Kottyashechka"
            >
              Masha
            </OnboardingLink>
          </Trans>
        </Paragraph>
        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '10px'
          }}
        >
          {t('text:onboarding.help.discord')}
        </Paragraph>
        <Paragraph>{t('text:onboarding.help.mentor')}</Paragraph>
      </Subsection>
    </Box>
  );
};
