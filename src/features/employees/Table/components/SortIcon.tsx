import { Box } from '@chakra-ui/react';
import { SortDirection } from '@tanstack/react-table';
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from 'react-icons/md';

const getAscendingColor = (sortDirection: SortDirection) =>
  sortDirection === 'asc'
    ? 'var(--chakra-colors-brand-accentRed)'
    : 'var(--chakra-colors-brand-body)';
const getDescendingColor = (sortDirection: SortDirection) =>
  sortDirection === 'desc'
    ? 'var(--chakra-colors-brand-accentRed)'
    : 'var(--chakra-colors-brand-body)';

export const SortIcon = ({ sorting }: { sorting: SortDirection | false }) => (
  <Box
    display="flex"
    flexDirection="column"
    marginLeft="9px"
  >
    <MdOutlineArrowUpward
      size="10px"
      color={sorting ? getAscendingColor(sorting) : undefined}
    />
    <MdOutlineArrowDownward
      size="10px"
      color={sorting ? getDescendingColor(sorting) : undefined}
    />
  </Box>
);
