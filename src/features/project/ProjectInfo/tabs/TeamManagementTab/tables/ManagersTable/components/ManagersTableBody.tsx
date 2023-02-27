import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, type Row } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ProjectManagers } from '~/store/api/projects/projects.types';

export const ManagersTableBody = ({
  rows
}: {
  rows: Row<ProjectManagers>[];
}) => {
  const [t] = useTranslation();

  return (
    <Tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td
                key={cell.id}
                _last={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  minHeight: '65px'
                }}
              >
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
            {t('domains:employee.errors.no_information')}
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};
