import { Box, Text } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Avatar } from '~/shared/ui/components/Avatar';
import { BaseTooltip } from '~/shared/ui/components/Tooltip';

import type { EmployeesTableRow } from '../table.types';

export const NameCell = ({
  row: {
    original: { status, avatar }
  },
  getValue
}: CellContext<EmployeesTableRow, string>) => {
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
        labelText={t(`enums:employee_status.${status}`)}
      >
        <Avatar
          variant={status}
          size="sm"
          src={avatar}
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
