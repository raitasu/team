import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/shared/ui/components/Button';

export const ProjectsFiltersDrawer = () => {
  const [t] = useTranslation();

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        {t('domains:filters.titles.filter', { count: 100 })}
      </DrawerHeader>

      <DrawerBody>
        <Input
          type="search"
          placeholder="Search by project..."
        />
      </DrawerBody>

      <DrawerFooter>
        <Button isDisabled>{t('domains:filters.actions.clear_filters')}</Button>
      </DrawerFooter>
    </DrawerContent>
  );
};
