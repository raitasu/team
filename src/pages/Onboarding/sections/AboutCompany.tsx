import { Box, Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { socialLinks } from '~/pages/Onboarding/onboarding.constants';
import {
  OnboardingLink,
  Paragraph,
  Subsection,
  Subtitle,
  OnboardingListItem as ListItem
} from '~/pages/Onboarding/sections/sections.styled';

export const AboutCompany = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.about')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.about.who_we_are')}</Subtitle>

        <Paragraph>{t('text:onboarding.about.who_we_are.company')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.who_we_are.geography')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.who_we_are.team')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:onboarding.about.history')}</Subtitle>

        <Paragraph>{t('text:onboarding.about.history.was_created')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.history.base')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.history.offices')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.history.remote_work')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:onboarding.about.values')}</Subtitle>

        <Paragraph>{t('text:onboarding.about.values.core_value')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.values.internships')}</Paragraph>
        <Paragraph>{t('text:onboarding.about.values.driver')}</Paragraph>
      </Subsection>

      <Subsection border="none">
        <Subtitle>{t('titles:onboarding.about.goals')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          <ListItem>{t('text:onboarding.about.goals.products')}</ListItem>
          <ListItem>{t('text:onboarding.about.goals.brand')}</ListItem>
          <ListItem>{t('text:onboarding.about.goals.locations')}</ListItem>
          <ListItem>{t('text:onboarding.about.goals.place')}</ListItem>
        </UnorderedList>
      </Subsection>

      <Box padding="0 40px 30px">
        {socialLinks.map(({ tag, target }) => (
          <OnboardingLink
            key={target}
            target={target}
          >
            {tag}
          </OnboardingLink>
        ))}
      </Box>
    </Box>
  );
};
