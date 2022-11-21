import {
  Box,
  Flex,
  Heading,
  Image,
  UnorderedList,
  useMediaQuery,
  VisuallyHidden
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Paragraph,
  Subsection,
  Subtitle,
  AboutListItem as ListItem,
  AboutLink
} from '~/pages/About/sections/sections.styled';

import logTimeScreen from '../assets/log_time.jpg';
import spentTimeScreen from '../assets/spent_time.jpg';

export const Memento = () => {
  const [t] = useTranslation();
  const [isLargerThan1258] = useMediaQuery('(min-width: 1258px)');

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.memento')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.memento.introduce')}</Subtitle>

        <Paragraph>
          <Trans i18nKey="text:about.memento.introduce.using">
            <AboutLink target="https://memento.cybergizer.com/login">
              «Memento»
            </AboutLink>
          </Trans>
        </Paragraph>
        <Paragraph>{t('text:about.memento.introduce.tracking')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.work_time')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.comment_field')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.note')}</Paragraph>
        <Paragraph>
          <Trans i18nKey="text:about.memento.introduce.project">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.memento.track_time')}</Subtitle>

        <Paragraph
          style={{
            marginBottom: '4px'
          }}
        >
          {t('text:about.memento.track_time.intro')}
        </Paragraph>

        <UnorderedList
          style={{
            marginTop: '0',
            marginBottom: '20px'
          }}
        >
          <ListItem>{t('text:about.memento.track_time.steps.date')}</ListItem>
          <ListItem>
            {t('text:about.memento.track_time.steps.comments')}
          </ListItem>
          <ListItem>
            {t('text:about.memento.track_time.steps.activity')}
          </ListItem>
          <ListItem>{t('text:about.memento.track_time.steps.create')}</ListItem>
        </UnorderedList>

        <Paragraph>{t('text:about.memento.track_time.tasks')}</Paragraph>
        <Paragraph>{t('text:about.memento.track_time.tracking')}</Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          {t('text:about.memento.track_time.example')}
        </Paragraph>

        <Flex
          flexDirection={isLargerThan1258 ? 'row' : 'column'}
          gap="20px"
          style={{ marginTop: 0 }}
        >
          <Image
            width="calc(50% - 10px)"
            maxWidth="510px"
            minWidth="350px"
            height="451px"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={spentTimeScreen}
            alt="Screenshot"
          />
          <Image
            width="calc(50% - 10px)"
            maxWidth="510px"
            minWidth="350px"
            height="451px"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={logTimeScreen}
            alt="Screenshot"
          />
        </Flex>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.memento.help')}</Subtitle>

        <Paragraph>
          <Trans i18nKey="text:about.memento.help.questions">
            <AboutLink target="https://t.me/Kottyashechka">Masha</AboutLink>
          </Trans>
        </Paragraph>
      </Subsection>
    </Box>
  );
};
