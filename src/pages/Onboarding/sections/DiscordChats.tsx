import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  DescriptionItem,
  Paragraph,
  Subsection,
  Subtitle
} from '~/pages/Onboarding/sections/sections.styled';

import { descriptionItems } from '../onboarding.constants';

export const DiscordChats = () => {
  const [t] = useTranslation();

  return (
    <Box
      as="section"
      bg="brand.white"
    >
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:onboarding.discord')}</Heading>
      </VisuallyHidden>

      <Subsection>
        <Subtitle>{t('titles:onboarding.discord.summary')}</Subtitle>

        <Paragraph>{t('text:onboarding.discord.intro')}</Paragraph>

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
