import { Box, Heading, UnorderedList, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  Paragraph,
  Subsection,
  Subtitle,
  AboutListItem as ListItem
} from './sections.styled';

export const ScheduleWork = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.schedule')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.schedule.work_schedule')}</Subtitle>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:about.schedule.work_schedule.working_day')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>{t('text:about.schedule.work_schedule.from10')}</ListItem>
          <ListItem>{t('text:about.schedule.work_schedule.from9')}</ListItem>
        </UnorderedList>

        <Paragraph>{t('text:about.schedule.work_schedule.hours')}</Paragraph>
        <Paragraph>{t('text:about.schedule.work_schedule.week')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.schedule.details')}</Subtitle>

        <Paragraph>{t('text:about.schedule.details.remote_work')}</Paragraph>
        <Paragraph>{t('text:about.schedule.details.response_time')}</Paragraph>
        <Paragraph>{t('text:about.schedule.details.holydays')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.schedule.help')}</Subtitle>

        <Paragraph>{t('text:about.schedule.help.contact')}</Paragraph>
      </Subsection>
    </Box>
  );
};
