import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { SectionContainer } from '~/pages/About/sections/sections.styled';

export const Birthdays = () => {
  const [t] = useTranslation();

  return (
    <SectionContainer>
      <Heading variant="3">{t('navigation:about.birthdays')}</Heading>
    </SectionContainer>
  );
};
