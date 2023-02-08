import { Box, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const NameCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee>) => {
  const [t] = useTranslation();
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
          labelText={t(`enums:employee_status.${employee.status}`)}
        >
          <Avatar
            variant={employee.status}
            size="sm"
            src={employee.avatar ?? undefined}
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
