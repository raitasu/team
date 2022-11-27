import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, type Row } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const TableBody = ({ rows }: { rows: Row<ShortEmployee>[] }) => {
  const [t] = useTranslation();

  return (
    <Tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))
      ) : (
        <Tr>
          <Td
            colSpan={2000}
            textAlign="center"
          >
            {t('domains:employee.errors.no_data')}
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};
