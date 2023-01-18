import { Text, Link } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import { PagePaths } from '~/router/router.constants';
import { type Project } from '~/store/api/projects/projects.types';

export const ProjectCell = ({ getValue }: CellContext<Project, Project>) => {
  const project = getValue();

  return (
    <Link
      key={project.id}
      href={`${PagePaths.Projects}/${project.id}`}
      target="_blank"
    >
      <Text
        variant="mm"
        color="brand.headline"
      >
        {project.name}
      </Text>
    </Link>
  );
};
