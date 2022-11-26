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

export const ScheduleWork = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.schedule')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.schedule.work_schedule')}
        </Subtitle>

        <Paragraph
          style={{
            marginTop: '0',
            marginBottom: '4px'
          }}
        >
          {t('domains:about_sections.text.schedule.work_schedule.working_day')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>
            {t('domains:about_sections.text.schedule.work_schedule.from10')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.schedule.work_schedule.from9')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          {t('domains:about_sections.text.schedule.work_schedule.hours')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.schedule.work_schedule.week')}
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.schedule.details')}
        </Subtitle>

        <Paragraph>
          {t('domains:about_sections.text.schedule.details.remote_work')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.schedule.details.response_time')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.schedule.details.holydays')}
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.schedule.help')}</Subtitle>

        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.schedule.help.contact">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
