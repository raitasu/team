import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
  VisuallyHidden
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Paragraph, Subsection, Subtitle } from './sections.styled';

export const ScheduleWork = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.schedule')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.schedule.work_schedule')}</Subtitle>

        <Paragraph>
          {t('text:onboarding.schedule.work_schedule.working_day')}
        </Paragraph>

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
            {t('text:onboarding.schedule.work_schedule.from10')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:onboarding.schedule.work_schedule.from9')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          {t('text:onboarding.schedule.work_schedule.hours')}
        </Paragraph>
        <Paragraph>
          {t('text:onboarding.schedule.work_schedule.week')}
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:onboarding.schedule.details')}</Subtitle>

        <Paragraph>
          {t('text:onboarding.schedule.details.remote_work')}
        </Paragraph>
        <Paragraph>
          {t('text:onboarding.schedule.details.response_time')}
        </Paragraph>
        <Paragraph>{t('text:onboarding.schedule.details.holydays')}</Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:onboarding.schedule.help')}</Subtitle>

        <Paragraph>{t('text:onboarding.schedule.help.contact')}</Paragraph>
      </Subsection>
    </Box>
  );
};
