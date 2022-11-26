import { Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  AboutListItem as ListItem,
  SectionContainer,
  Subsection,
  Subtitle
} from './sections.styled';

export const Communications = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">
          {t('navigation:about_sections.communications')}
        </Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.communications.steps')}
        </Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem marginBottom="10px">
            {t('domains:about_sections.text.communications.steps.address')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('domains:about_sections.text.communications.steps.polite')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.communications.steps.thanks')}
          </ListItem>
        </UnorderedList>
      </Subsection>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.communications.rules')}
        </Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem marginBottom="10px">
            {t('domains:about_sections.text.communications.rules.meetings')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('domains:about_sections.text.communications.rules.in_time')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('domains:about_sections.text.communications.rules.vacation')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.communications.rules.video')}
          </ListItem>
        </UnorderedList>
      </Subsection>
    </SectionContainer>
  );
};
