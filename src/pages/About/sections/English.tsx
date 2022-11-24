import { Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  AboutLink,
  AboutListItem as ListItem,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from './sections.styled';

export const English = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.english')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.english.company')}</Subtitle>

        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          {t('text:about.english.company.opportunity')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>{t('text:about.english.company.format')}</ListItem>
          <ListItem>{t('text:about.english.company.teacher')}</ListItem>
        </UnorderedList>

        <Paragraph>{t('text:about.english.company.schedule')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.english.company.contact">
            <AboutLink
              display="inline"
              target="https://t.me/Kottyashechka"
            >
              Masha
            </AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.english.courses')}</Subtitle>

        <Paragraph>{t('text:about.english.courses.compensation')}</Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
