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
        <Heading variant="3">{t('navigation:about.perks')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.perks.sport')}</Subtitle>

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
            {t('text:about.perks.sport.gym')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.perks.sport.limit')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          <Trans i18nKey="text:about.perks.sport.help">
            <AboutLink target="https://t.me/msansan">Alexander</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.perks.conferences')}</Subtitle>

        <Paragraph>{t('text:about.perks.conferences.meetups')}</Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.perks.courses')}</Subtitle>

        <Paragraph>{t('text:about.perks.courses.certificate')}</Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.perks.articles')}</Subtitle>

        <Paragraph>{t('text:about.perks.articles.requirements')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.perks.articles.link">
            <AboutLink target="https://ruby.news/">ruby.news</AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.perks.articles.guide">
            <AboutLink target="https://ruby.news/contribute/">
              ruby.news/contribute
            </AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.perks.workplace')}</Subtitle>

        <Paragraph>{t('text:about.perks.workplace.joy')}</Paragraph>
        <Paragraph>{t('text:about.perks.workplace.installments')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.perks.workplace.help">
            <AboutLink target="https://t.me/msansan">Alexander</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
