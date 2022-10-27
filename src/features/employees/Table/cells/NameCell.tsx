import { Box, Text } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Employee } from '~/shared/store/api/api.types';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const NameCell = ({ row, getValue }: CellContext<Employee, string>) => {
  const [t] = useTranslation();

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
    >
      <Tooltip
        hasArrow
        place="left"
        labelText={t(`enums:employee_status.${row.original.status}`)}
      >
        <Avatar
          variant={row.original.status}
          size="sm"
          src={row.original.avatar.url ?? undefined}
        />
      </Tooltip>
      <Text
        variant="mm"
        color="brand.headline"
      >
        {getValue()}
      </Text>
    </Box>
  );
};
