import { Box, Th, Thead, Tr } from '@chakra-ui/react';
import { type HeaderGroup, flexRender } from '@tanstack/react-table';

import { SortIcon } from '~/features/projects/Tables/components/SortIcon';
import { type Project } from '~/store/api/projects/projects.types';

export const TableHeader = ({
  headerGroups
}: {
  headerGroups: HeaderGroup<Project>[];
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
              whiteSpace="nowrap"
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
