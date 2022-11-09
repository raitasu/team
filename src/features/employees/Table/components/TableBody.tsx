import { Tbody, Td, Tr } from '@chakra-ui/react';
import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import type { ShortEmployee } from '~/shared/store/api/employees/employees.types';

export const TableBody = ({ rows }: { rows: Row<ShortEmployee>[] }) => (
  <Tbody>
    {rows.map((row) => (
      <Tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <Td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        ))}
      </Tr>
    ))}
  </Tbody>
);
