import { Box, Button } from '@chakra-ui/react';

import { projectsSelector } from '~/features/projects/slice/projects.selectors';
import { projectActions } from '~/features/projects/slice/projects.slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/store.hooks';

export const Projects = () => {
  const projects = useAppSelector(projectsSelector);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Box>Projects</Box>
      <Button
        onClick={() => {
          dispatch(projectActions.loadProject());
        }}
      >
        Load Project
      </Button>
      <div>
        {projects.map((project) => (
          <div key={project.id}>{project.id}</div>
        ))}
      </div>
    </div>
  );
};
