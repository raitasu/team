import { type CellContext } from '@tanstack/react-table';

import { TableLink } from '~/features/employees/Tables/components/TableLink';
import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';

export const EmailCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['contacts']>) => (
  <TableLink
    link={getValue().emails[0]}
    linkType="email"
  />
);
