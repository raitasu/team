import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { descriptionItems } from '~/pages/About/about.constants';
import {
  DescriptionItem,
  Paragraph,
  SectionContainer,
  Subsection,
  Subtitle
} from '~/pages/About/sections/sections.styled';

export const DiscordChats = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.discord')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>
          {t('domains:about_sections.titles.discord.summary')}
        </Subtitle>

        <Paragraph>{t('domains:about_sections.text.discord.intro')}</Paragraph>

        <Box
          as="dl"
          style={{ marginTop: 0 }}
        >
          {descriptionItems.map(({ term, definition }) => (
            <DescriptionItem
              key={term}
              channel={term}
              description={t(definition)}
            />
          ))}
        </Box>
      </Subsection>
    </SectionContainer>
  );
};
