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
        <Heading variant="3">{t('navigation:about.communications')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.communications.steps')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem marginBottom="10px">
            {t('text:about.communications.steps.address')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('text:about.communications.steps.polite')}
          </ListItem>
          <ListItem>{t('text:about.communications.steps.thanks')}</ListItem>
        </UnorderedList>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.communications.rules')}</Subtitle>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem marginBottom="10px">
            {t('text:about.communications.rules.meetings')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('text:about.communications.rules.in_time')}
          </ListItem>
          <ListItem marginBottom="10px">
            {t('text:about.communications.rules.vacation')}
          </ListItem>
          <ListItem>{t('text:about.communications.rules.video')}</ListItem>
        </UnorderedList>
      </Subsection>
    </SectionContainer>
  );
};
