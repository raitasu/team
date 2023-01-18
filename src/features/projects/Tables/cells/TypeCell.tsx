import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type Project } from '~/store/api/projects/projects.types';

export const TypeCell = ({ getValue }: CellContext<Project, Project>) => {
  const project = getValue();
  const [t] = useTranslation();

  return (
    <Text
      variant="mm"
      color="brand.headline"
    >
      {t(`domains:projects.type.${project.project_type}`)}
    </Text>
  );
};
