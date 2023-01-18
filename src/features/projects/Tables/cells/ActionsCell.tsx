import { Box, Img } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import { type Project } from '~/store/api/projects/projects.types';

import connectIcon from '../assets/connect.svg';
import deleteIcon from '../assets/delete.svg';

export const ActionsCell = ({ getValue }: CellContext<Project, Project>) => {
  const project = getValue();

  return (
    <Box
      display="flex"
      gap={3}
    >
      <Img
        src={connectIcon}
        alt="Connect project"
        sx={{ cursor: 'pointer' }}
        onClick={() => project.id}
      />
      <Img
        src={deleteIcon}
        alt="Delete project"
        sx={{ cursor: 'pointer' }}
        onClick={() => project.id}
      />
    </Box>
  );
};
