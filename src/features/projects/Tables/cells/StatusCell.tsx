import { Box, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { ProjectStatus } from '~/features/projects/Tables/tables.constants';
import { type ShortProject } from '~/store/api/projects/projects.types';

export const StatusCell = ({
  getValue
}: CellContext<ShortProject, ShortProject>) => {
  const project = getValue();
  const [t] = useTranslation();

  const getStatusColor = (project: ShortProject) => {
    switch (project.status) {
      case ProjectStatus.Completed:
        return '#0077B5';
      case ProjectStatus.InProgress:
        return '#56A06B';
      case ProjectStatus.OnHold:
        return '#CE9D1E';
      case ProjectStatus.Wasted:
        return '#EF4523';
      default:
        return '#B3B3B3';
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={`1px solid ${getStatusColor(project)}`}
      borderRadius="4px"
      width="130px"
      height="32px"
    >
      <Text
        variant="mm"
        color="brand.headline"
      >
        {t(`domains:projects.status.${project.status}`)}
      </Text>
    </Box>
  );
};
