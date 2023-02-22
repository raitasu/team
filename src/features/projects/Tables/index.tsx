import { Box, Flex } from '@chakra-ui/react';

import { TableLoader } from '~/features/projects/Tables/components/TableLoader';
import { type ProjectsTableType } from '~/features/projects/Tables/tables.types';
import { Pagination } from '~/shared/ui/components/Pagination';
import { getTotalPages } from '~/shared/utils/pagination.utils';
import { useGetProjectsQuery } from '~/store/api/projects/projects.api';
import {
  selectProjectsFilters,
  selectProjectsPagination,
  selectProjectsSorting
} from '~/store/slices/projects/projects.selectors';
import {
  toggleElementsPerPage,
  togglePage,
  toggleSorting
} from '~/store/slices/projects/projects.slice';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';

export const ProjectsTableContainer = ({
  hasAdminAccess,
  table: Table
}: {
  hasAdminAccess: boolean;
  table: ProjectsTableType;
}) => {
  const pagination = useAppSelector(selectProjectsPagination);
  const filters = useAppSelector(selectProjectsFilters);
  const sorting = useAppSelector(selectProjectsSorting);

  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetProjectsQuery({
    page: pagination.currentPage,
    elementsPerPage: pagination.elementsPerPage,
    filters,
    sorting
  });

  const totalPages = getTotalPages(
    data?.page.total_count || 0,
    pagination.elementsPerPage
  );

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      height="min-content"
      maxH="100%"
      minHeight="100%"
      width="100%"
    >
      <Box
        flex="1"
        minH="0"
        overflow="auto"
        border="1px solid var(--chakra-colors-brand-stroke)"
        borderRadius="4px"
        backgroundColor="var(--chakra-colors-brand-background2)"
        position="relative"
      >
        {isFetching && <TableLoader />}
        <Table
          data={data?.items || []}
          hasAdminAccess={hasAdminAccess}
          sorting={sorting}
          onSortingChange={(updatedSort) =>
            dispatch(toggleSorting(updatedSort))
          }
        />
      </Box>
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        marginTop="18px"
      >
        <Pagination
          totalPages={totalPages}
          currentPage={pagination.currentPage}
          pageSize={pagination.elementsPerPage}
          onPageChange={(page) => dispatch(togglePage(page))}
          onPageSizeChange={(size) => dispatch(toggleElementsPerPage(size))}
        />
      </Box>
    </Flex>
  );
};
