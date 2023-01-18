import { AvatarGroup } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import { Avatar } from '~/shared/ui/components/Avatar';
import defaultAvatar from '~/shared/ui/components/Avatar/defaultAvatar.svg';
import { type Project } from '~/store/api/projects/projects.types';

export const TeamCell = ({ getValue }: CellContext<Project, Project>) => {
  const project = getValue();

  return (
    <AvatarGroup
      size="md"
      max={3}
    >
      {project.team.map((employee) => (
        <Avatar
          key={employee.id}
          size="md"
          src={employee.avatar || defaultAvatar}
        />
      ))}
    </AvatarGroup>
  );
};
