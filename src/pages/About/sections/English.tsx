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
        <Heading variant="3">{t('navigation:about_sections.english')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.english.company')}
        </Subtitle>

        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          {t('domains:about_sections.text.english.company.opportunity')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>
            {t('domains:about_sections.text.english.company.format')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.english.company.teacher')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          {t('domains:about_sections.text.english.company.schedule')}
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.english.company.contact">
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
        <Subtitle>
          {t('domains:about_sections.titles.english.courses')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.english.courses.compensation')}
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
