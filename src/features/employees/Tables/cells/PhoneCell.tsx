import { type CellContext } from '@tanstack/react-table';

import { TableLink } from '~/features/employees/Tables/components/TableLink';
import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';

export const PhoneCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['contacts']>) => (
  <TableLink
    link={getValue().primary_phone}
    linkType="phone"
  />
);
