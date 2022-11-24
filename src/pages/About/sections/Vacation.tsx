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

export const Vacation = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.vacation')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.vacation.days')}</Subtitle>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:about.vacation.days.days')}
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
            {t('text:about.vacation.days.approval')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.vacation.days.new_emploees')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.vacation.days.part_vacation')}
          </ListItem>
          <ListItem
            marginLeft="30px"
            color="brand.ghostGray"
          >
            {t('text:about.vacation.days.compensation')}
          </ListItem>
        </UnorderedList>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:about.vacation.days.spin_off')}
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
            {t('text:about.vacation.days.percent')}
          </ListItem>
        </UnorderedList>

        <Paragraph
          style={{
            marginBottom: '4px',
            fontWeight: '500'
          }}
        >
          {t('text:about.vacation.days.coordinate')}
        </Paragraph>

        <Paragraph>
          <Trans i18nKey="text:about.vacation.days.help">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>

        <Paragraph
          style={{
            marginBottom: '4px',
            fontWeight: '500'
          }}
        >
          {t('text:about.vacation.days.get_pay')}
        </Paragraph>

        <Paragraph>
          <Trans i18nKey="text:about.vacation.days.contact">
            <AboutLink target="https://t.me/msansan">Alexander</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.vacation.birthday')}</Subtitle>

        <Paragraph>
          {t('text:about.vacation.birthday.birthday_day_off')}
        </Paragraph>
      </Subsection>
      <Subsection>
        <Subtitle>{t('titles:about.vacation.leave')}</Subtitle>

        <Paragraph>{t('text:about.vacation.leave.unpaid_leave')}</Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
