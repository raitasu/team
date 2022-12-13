import { type CellContext } from '@tanstack/react-table';

import { TableLink } from '~/features/employees/Tables/components/TableLink';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const EmailCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['email']>) => (
  <TableLink
    link={getValue()}
    linkType="email"
  />
);
