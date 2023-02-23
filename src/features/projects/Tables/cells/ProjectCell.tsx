import { Text, Link } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { type Project } from '~/store/api/projects/projects.types';

export const ProjectCell = ({ getValue }: CellContext<Project, Project>) => {
  const project = getValue();

  return (
    <Link
      as={NavLink}
      key={project.id}
      to={`${PagePaths.Projects}/${project.id}`}
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
