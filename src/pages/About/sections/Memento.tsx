import {
  Flex,
  Heading,
  Image,
  UnorderedList,
  useMediaQuery,
  VisuallyHidden
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  AboutLink,
  AboutListItem as ListItem,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from '~/pages/About/sections/sections.styled';

import logTimeScreen from '../assets/log_time.jpg';
import spentTimeScreen from '../assets/spent_time.jpg';

export const Memento = () => {
  const [t] = useTranslation();
  const [isLargerThan1258] = useMediaQuery('(min-width: 1258px)');

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.memento')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.memento.introduce')}
        </Subtitle>

        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.memento.introduce.using">
            <AboutLink target="https://memento.cybergizer.com/login">
              «Memento»
            </AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.memento.introduce.tracking')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.memento.introduce.work_time')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.memento.introduce.comment_field')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.memento.introduce.note')}
        </Paragraph>
        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.memento.introduce.project">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.memento.track_time')}
        </Subtitle>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('domains:about_sections.text.memento.track_time.intro')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>
            {t('domains:about_sections.text.memento.track_time.steps.date')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.memento.track_time.steps.comments')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.memento.track_time.steps.activity')}
          </ListItem>
          <ListItem>
            {t('domains:about_sections.text.memento.track_time.steps.create')}
          </ListItem>
        </UnorderedList>

        <Paragraph>
          {t('domains:about_sections.text.memento.track_time.tasks')}
        </Paragraph>
        <Paragraph>
          {t('domains:about_sections.text.memento.track_time.tracking')}
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          {t('domains:about_sections.text.memento.track_time.example')}
        </Paragraph>

        <Flex
          flexDirection={isLargerThan1258 ? 'row' : 'column'}
          gap="20px"
          style={{ marginTop: 0 }}
        >
          <Image
            width={isLargerThan1258 ? 'calc(50% - 10px)' : '100%'}
            height="auto"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={spentTimeScreen}
            alt="Screenshot"
          />
          <Image
            width={isLargerThan1258 ? 'calc(50% - 10px)' : '100%'}
            height="auto"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={logTimeScreen}
            alt="Screenshot"
          />
        </Flex>
      </Subsection>

      <Subsection>
        <Subtitle>{t('domains:about_sections.titles.memento.help')}</Subtitle>

        <Paragraph>
          <Trans i18nKey="domains:about_sections.text.memento.help.questions">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </SectionContainer>
  );
};
