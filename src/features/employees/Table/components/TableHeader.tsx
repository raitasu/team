import { Box, Th, Thead, Tr } from '@chakra-ui/react';
import { type HeaderGroup, flexRender } from '@tanstack/react-table';

import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';

import { SortIcon } from './SortIcon';

export const TableHeader = ({
  headerGroups
}: {
  headerGroups: HeaderGroup<ShortEmployee>[];
}) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const sorting = header.column.getIsSorted();
          const isSortableColumn = header.column.getCanSort();

          return (
            <Th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              sx={
                isSortableColumn
                  ? { cursor: 'pointer', userSelect: 'none' }
                  : undefined
              }
            >
              <Box
                display="flex"
                alignItems="center"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {isSortableColumn && <SortIcon sorting={sorting} />}
              </Box>
            </Th>
          );
        })}
      </Tr>
    ))}
  </Thead>
);
