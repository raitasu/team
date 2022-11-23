import { Box, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const NameCell = ({
  row: { original: employee }
}: CellContext<ShortEmployee, undefined>) => {
  const [t, { language }] = useTranslation();

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
            src={employee.avatar_url ?? undefined}
          />
        </Tooltip>
        <Text
          variant="mm"
          color="brand.headline"
        >
          {`${getTranslation(employee.first_name, language)} ${getTranslation(
            employee.last_name,
            language
          )}`}
        </Text>
      </Box>
    </Link>
  );
};
