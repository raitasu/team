import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';

import { EmployeesTableRow } from '../table.types';

export const TableBody = ({
  rows
}: {
  rows: Array<Row<EmployeesTableRow>>;
}) => (
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
