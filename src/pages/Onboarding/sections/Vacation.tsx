import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
  VisuallyHidden
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Subsection, Subtitle, Paragraph } from './sections.styled';

export const Vacation = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.vacation')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.vacation.days')}</Subtitle>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:onboarding.vacation.days.days')}
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
            {t('text:onboarding.vacation.days.approval')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:onboarding.vacation.days.new_emploees')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:onboarding.vacation.days.part_vacation')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:onboarding.vacation.days.compensation')}
          </ListItem>
        </UnorderedList>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:onboarding.vacation.days.spin_off')}
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
            {t('text:onboarding.vacation.days.percent')}
          </ListItem>
        </UnorderedList>

        <Paragraph
          style={{
            marginBottom: '4px',
            fontWeight: '500'
          }}
        >
          {t('text:onboarding.vacation.days.coordinate')}
        </Paragraph>
        <Paragraph>{t('text:onboarding.vacation.days.help')}</Paragraph>

        <Paragraph
          style={{
            marginBottom: '4px',
            fontWeight: '500'
          }}
        >
          {t('text:onboarding.vacation.days.get_pay')}
        </Paragraph>
        <Paragraph>{t('text:onboarding.vacation.days.contact')}</Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:onboarding.vacation.birthday')}</Subtitle>

        <Paragraph>
          {t('text:onboarding.vacation.birthday.birthday_day_off')}
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:onboarding.vacation.leave')}</Subtitle>

        <Paragraph>
          {t('text:onboarding.vacation.leave.unpaid_leave')}
        </Paragraph>
      </Subsection>
    </Box>
  );
};
