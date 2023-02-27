import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, type Row } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ShortProject } from '~/store/api/projects/projects.types';

export const TableBody = ({ rows }: { rows: Row<ShortProject>[] }) => {
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
            {t('domains:projects.errors.no_projects_data')}
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};
