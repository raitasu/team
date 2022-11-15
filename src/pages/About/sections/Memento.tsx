import {
  Box,
  Heading,
  HStack,
  Image,
  UnorderedList,
  VisuallyHidden
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  Paragraph,
  Subsection,
  Subtitle,
  AboutListItem as ListItem
} from '~/pages/About/sections/sections.styled';

import logTimeScreen from '../assets/log_time.jpg';
import spentTimeScreen from '../assets/spent_time.jpg';

export const Memento = () => {
  const [t] = useTranslation();

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

        <Paragraph>{t('text:about.memento.introduce.using')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.tracking')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.work_time')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.comment_field')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.note')}</Paragraph>
        <Paragraph>{t('text:about.memento.introduce.project')}</Paragraph>
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

        <HStack gap="20px">
          <Image
            width="510px"
            height="451px"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={spentTimeScreen}
            alt="Screenshot"
          />
          <Image
            width="510px"
            height="451px"
            borderRadius="4px"
            backgroundColor="brand.ghostWhite"
            src={logTimeScreen}
            alt="Screenshot"
          />
        </HStack>
      </Subsection>

      <Subsection>
        <Subtitle>{t('titles:about.memento.help')}</Subtitle>

        <Paragraph>{t('text:about.memento.help.questions')}</Paragraph>
      </Subsection>
    </Box>
  );
};
