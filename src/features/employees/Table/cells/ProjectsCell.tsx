import { Text } from '@chakra-ui/react';
import type { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { getTranslation } from '~/services/i18n/i18n.utils';
import type { ShortEmployee } from '~/shared/store/api/employees/employees.types';

export const ProjectsCell = ({
  row: {
    original: { projects }
  }
}: CellContext<ShortEmployee, ShortEmployee['projects']>) => {
  const [t, { language }] = useTranslation();

  return projects.length !== 0 ? (
    projects.map((project) => (
      <Text key={project.id}>
        {getTranslation(project.name_translations, language)}
      </Text>
    ))
  ) : (
    <Text color="brand.lightGray">
      {t('titles:employees.table_headers.no_projects')}
    </Text>
  );
};
