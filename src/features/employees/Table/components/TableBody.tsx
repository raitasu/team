import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';

import { Employee } from '~/shared/store/api/api.types';

export const TableBody = ({ rows }: { rows: Array<Row<Employee>> }) => (
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
