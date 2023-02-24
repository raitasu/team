import { Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const BirthdayCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['date_of_birth']>) => {
  const [t, { language }] = useTranslation();
  const birthday = getValue();

  const value = birthday
    ? getFormattedDate(birthday, language, DateFormats.Long)
    : undefined;

  return value ? (
    <span>{value}</span>
  ) : (
    <Text color="brand.lightGray">{t('domains:employee.errors.no_data')}</Text>
  );
};
