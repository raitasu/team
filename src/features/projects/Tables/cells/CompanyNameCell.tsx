import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ShortProject } from '~/store/api/projects/projects.types';

export const CompanyNameCell = ({
  getValue
}: CellContext<ShortProject, ShortProject>) => {
  const [t] = useTranslation();
  const project = getValue();

  return project.customer_name ? (
    <Text
      variant="mm"
      color="brand.headline"
    >
      {project.customer_name}
    </Text>
  ) : (
    <Text color="brand.lightGray">{t('domains:employee.errors.no_data')}</Text>
  );
};
