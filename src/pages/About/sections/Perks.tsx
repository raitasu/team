import {
  Heading,
  ListItem,
  UnorderedList,
  VisuallyHidden
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  AboutLink,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from './sections.styled';

export const Perks = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.perks')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.perks.sport')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.perks.sport.gym')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('domains:about_sections.text.perks.sport.limit')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.perks.sport.help">
            <AboutLink target="https://t.me/msansan">Alexander</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.perks.conferences')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.perks.conferences.meetups')}
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.perks.courses')}</Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.perks.courses.certificate')}
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.perks.articles')}</Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.perks.articles.requirements')}
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.perks.articles.link">
            <AboutLink target="https://ruby.news/">ruby.news</AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.perks.articles.guide">
            <AboutLink target="https://ruby.news/contribute/">
              ruby.news/contribute
            </AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.perks.workplace')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.perks.workplace.joy')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.perks.workplace.installments')}
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.perks.workplace.help">
            <AboutLink target="https://t.me/msansan">Alexander</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
