import { Text } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';

import { Employee, EmployeeProject } from '~/shared/store/api/api.types';

export const ProjectsCell = ({
  row
}: CellContext<Employee, Array<EmployeeProject>>) =>
  row.original.projects.length !== 0 ? (
    row.original.projects.map((project) => (
      <Text key={project.id}>{project.name}</Text>
    ))
  ) : (
    <Text color="brand.lightGray">No current projects</Text>
  );
