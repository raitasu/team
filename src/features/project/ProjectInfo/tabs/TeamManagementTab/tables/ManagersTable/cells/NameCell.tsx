import { Box, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type ProjectManagers } from '~/store/api/projects/projects.types';

export const NameCell = ({
  getValue
}: CellContext<ProjectManagers, ProjectManagers>) => {
  const [t] = useTranslation();
  const manager = getValue();

  return (
    <Link to={`${PagePaths.Employees}/${manager.id}`}>
      <Box
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Tooltip
          hasArrow
          place="left"
          labelText={
            manager.status
              ? t(`enums:employee_status.${manager.status}`)
              : undefined
          }
        >
          <Avatar
            variant={manager.status ? manager.status : undefined}
            size="sm"
            src={
              manager.avatar
                ? `${import.meta.env.VITE_API_HOST}${manager.avatar}`
                : undefined
            }
          />
        </Tooltip>
        <Text
          variant="mm"
          color="brand.headline"
        >
          {`${manager.first_name} ${manager.last_name}`}
        </Text>
      </Box>
    </Link>
  );
};
