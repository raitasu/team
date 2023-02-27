import { Box, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type ProjectTeam } from '~/store/api/projects/projects.types';

export const NameCell = ({
  getValue
}: CellContext<ProjectTeam, ProjectTeam>) => {
  const employee = getValue();

  return (
    <Link to={`${PagePaths.Employees}/${employee.id}`}>
      <Box
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Tooltip
          hasArrow
          place="left"
        >
          <Avatar
            size="sm"
            src={
              employee.avatar
                ? `${import.meta.env.VITE_API_HOST}${employee.avatar}`
                : undefined
            }
          />
        </Tooltip>
        <Text
          variant="mm"
          color="brand.headline"
        >
          {`${employee.first_name} ${employee.last_name}`}
        </Text>
      </Box>
    </Link>
  );
};
