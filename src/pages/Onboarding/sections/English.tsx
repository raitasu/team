import { Box, Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  OnboardingLink,
  Paragraph,
  Subsection,
  Subtitle,
  OnboardingListItem as ListItem
} from './sections.styled';

export const English = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.english')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.english.company')}</Subtitle>

        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          {t('text:onboarding.english.company.opportunity')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>{t('text:onboarding.english.company.format')}</ListItem>
          <ListItem>{t('text:onboarding.english.company.teacher')}</ListItem>
        </UnorderedList>

        <Paragraph>{t('text:onboarding.english.company.schedule')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:onboarding.english.company.contact">
            <OnboardingLink
              display="inline"
              target="https://t.me/Kottyashechka"
            >
              Masha
            </OnboardingLink>
          </Trans>
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:onboarding.english.courses')}</Subtitle>

        <Paragraph>
          {t('text:onboarding.english.courses.compensation')}
        </Paragraph>
      </Subsection>
    </Box>
  );
};
