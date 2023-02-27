import { Box, Th, Thead, Tr } from '@chakra-ui/react';
import { type HeaderGroup, flexRender } from '@tanstack/react-table';

import { type ProjectTeam } from '~/store/api/projects/projects.types';

import { actionHeaderStyle } from '../../tables.styles';

export const TeamTableHeader = ({
  headerGroups
}: {
  headerGroups: HeaderGroup<ProjectTeam>[];
}) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <Th
            key={header.id}
            whiteSpace="nowrap"
            _last={actionHeaderStyle}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Box>
          </Th>
        ))}
      </Tr>
    ))}
  </Thead>
);
