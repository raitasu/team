import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const PositionCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['positions']>) => {
  const [t] = useTranslation();
  const positions = getValue() || [];

  const value =
    positions.length > 0
      ? positions.map((position) => position.name).join(', ')
      : undefined;

  return value ? (
    <span>{value}</span>
  ) : (
    <Text color="brand.lightGray">{t('domains:employee.errors.no_data')}</Text>
  );
};
