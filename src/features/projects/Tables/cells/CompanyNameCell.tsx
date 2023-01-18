import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import { type Project } from '~/store/api/projects/projects.types';

export const CompanyNameCell = ({
  getValue
}: CellContext<Project, Project>) => {
  const project = getValue();

  return (
    <Text
      variant="mm"
      color="brand.headline"
    >
      {project.customer_name}
    </Text>
  );
};
