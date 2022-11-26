import { Box, Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import { socialLinks } from '~/pages/About/about.constants';
import {
  AboutLink,
  AboutListItem as ListItem,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from '~/pages/About/sections/sections.styled';

export const AboutCompany = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.company')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.company.who_we_are')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.company.who_we_are.company')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.who_we_are.geography')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.who_we_are.team')}
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.company.history')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.company.history.was_created')}
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.company.history.base">
            <AboutLink target="http://rubizza.com/">rubizza.com</AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.history.offices')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.history.remote_work')}
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.company.values')}</Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.company.values.core_value')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.values.internships')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.company.values.driver')}
        </Paragraph>
      </Subsection>

      <Subsection border="none">
        <Subtitle>{t('domains:about_sections.titles.company.goals')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          <ListItem>
            {t('domains:about_sections.text.company.goals.products')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.company.goals.brand')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.company.goals.locations')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.company.goals.place')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.company.goals.products')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.company.goals.brand')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.company.goals.locations')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.company.goals.place')}
          </ListItem>
        </UnorderedList>
      </Subsection>

      <Box
        display="inline-flex"
        flexDirection="column"
        padding="0 40px 30px"
      >
        {socialLinks.map(({ tag, target }) => (
          <AboutLink
            marginBottom="10px"
            key={target}
            target={target}
          >
            {tag}
          </AboutLink>
        ))}
      </Box>
    </SectionContainer>
  );
};
