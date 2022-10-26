import { Text } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';

export const LanguageSwitcher = () => {
  const [, { language, changeLanguage }] = useTranslation();
  return (
    <Button
      variant="secondaryGhost"
      padding="12px 18px"
      textTransform="none"
      onClick={() => {
        changeLanguage(language === 'en' ? 'ru' : 'en').catch((err) =>
          console.error(err)
        );
      }}
      rightIcon={<MdLanguage />}
      iconSpacing="6px"
    >
      <Text variant="m">{upperFirst(language)}</Text>
    </Button>
  );
};
