import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { descriptionItems } from '~/pages/About/about.constants';
import {
  DescriptionItem,
  Paragraph,
  Subsection,
  Subtitle
} from '~/pages/About/sections/sections.styled';

export const DiscordChats = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about.discord')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:about.discord.summary')}</Subtitle>

        <Paragraph>{t('text:about.discord.intro')}</Paragraph>

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
    </Box>
  );
};