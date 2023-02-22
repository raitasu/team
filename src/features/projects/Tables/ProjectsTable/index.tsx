import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableBody } from '~/features/projects/Tables/components/TableBody';
import { TableHeader } from '~/features/projects/Tables/components/TableHeader';
import { PositionsColumns } from '~/features/projects/Tables/ProjectsTable/columns';
import { type ProjectsTableType } from '~/features/projects/Tables/tables.types';

export const ProjectsTable: ProjectsTableType = ({
  data,
  hasAdminAccess,
  sorting,
  onSortingChange
}) => {
  const table = useReactTable({
    columns: PositionsColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: (updater) =>
      onSortingChange(
        typeof updater === 'function' ? updater(sorting) : updater
      ),
    initialState: {
      columnVisibility: {
        actions: hasAdminAccess
      }
    },
    state: {
      sorting
    }
  });

  return (
    <Table>
      <TableHeader headerGroups={table.getHeaderGroups()} />
      <TableBody rows={table.getRowModel().rows} />
    </Table>
  );
};
