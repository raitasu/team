import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const AddressCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['contacts']['address']>) => {
  const [t] = useTranslation();
  const address = getValue();
  const country = address.country_code
    ? t(`enums:country.${address.country_code}`)
    : '';

  const value = address.city
    ? `${address.city}${country ? `, ${country}` : ''}`
    : country;

  return value ? (
    <span>{value}</span>
  ) : (
    <Text color="brand.lightGray">{t('domains:employee.errors.no_data')}</Text>
  );
};
