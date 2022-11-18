import { Box, Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import { socialLinks } from '~/pages/About/about.constants';
import {
  AboutLink,
  AboutListItem as ListItem,
  Paragraph,
  Subsection,
  Subtitle
} from '~/pages/About/sections/sections.styled';

export const AboutCompany = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.company')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.company.who_we_are')}</Subtitle>

        <Paragraph>{t('text:about.company.who_we_are.company')}</Paragraph>
        <Paragraph>{t('text:about.company.who_we_are.geography')}</Paragraph>
        <Paragraph>{t('text:about.company.who_we_are.team')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.company.history')}</Subtitle>

        <Paragraph>{t('text:about.company.history.was_created')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.company.history.base">
            <AboutLink target="http://rubizza.com/">rubizza.com</AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>{t('text:about.company.history.offices')}</Paragraph>
        <Paragraph>{t('text:about.company.history.remote_work')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.company.values')}</Subtitle>

        <Paragraph>{t('text:about.company.values.core_value')}</Paragraph>
        <Paragraph>{t('text:about.company.values.internships')}</Paragraph>
        <Paragraph>{t('text:about.company.values.driver')}</Paragraph>
      </Subsection>

      <Subsection border="none">
        <Subtitle>{t('titles:about.company.goals')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          <ListItem>{t('text:about.company.goals.products')}</ListItem>
          <ListItem>{t('text:about.company.goals.brand')}</ListItem>
          <ListItem>{t('text:about.company.goals.locations')}</ListItem>
          <ListItem>{t('text:about.company.goals.place')}</ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.company.goals.products')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.company.goals.brand')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.company.goals.locations')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.company.goals.place')}
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
    </Box>
  );
};
