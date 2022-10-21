import { Box, Text } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Employee } from '~/shared/store/api/api.types';
import { Avatar } from '~/shared/ui/components/Avatar';
import { BaseTooltip } from '~/shared/ui/components/Tooltip';

export const NameCell = ({ row, getValue }: CellContext<Employee, string>) => {
  const [t] = useTranslation();
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
    >
      <BaseTooltip
        hasArrow
        place="left"
        labelText={t(`enums:employee_status.${row.original.status}`)}
      >
        <Avatar
          variant={row.original.status}
          size="sm"
          src={row.original.avatar.url ?? undefined}
        />
      </BaseTooltip>
      <Text
        variant="mm"
        color="brand.headline"
      >
        {getValue()}
      </Text>
    </Box>
  );
};
