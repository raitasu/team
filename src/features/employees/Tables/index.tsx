import { Box, Flex } from '@chakra-ui/react';

import { TableLoader } from '~/features/employees/Tables/components/TableLoader';
import { type EmployeesTable } from '~/features/employees/Tables/tables.types';
import { Pagination } from '~/shared/ui/components/Pagination';
import { getTotalPages } from '~/shared/utils/pagination.utils';
import { useGetEmployeesQuery } from '~/store/api/employees/employees.api';
import { selectCurrentEmployee } from '~/store/api/employees/employees.selectors';
import {
  selectEmployeesFilters,
  selectEmployeesPagination,
  selectEmployeesSorting
} from '~/store/slices/employees/employees.selectors';
import {
  toggleElementsPerPage,
  togglePage,
  toggleSorting
} from '~/store/slices/employees/employees.slice';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';

export const EmployeesTablesContainer = ({
  table: Table
}: {
  table: EmployeesTable;
}) => {
  const pagination = useAppSelector(selectEmployeesPagination);
  const filters = useAppSelector(selectEmployeesFilters);
  const sorting = useAppSelector(selectEmployeesSorting);
  const { data: employee } = useAppSelector(selectCurrentEmployee);
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetEmployeesQuery({
    page: pagination.currentPage,
    elementsPerPage: pagination.elementsPerPage,
    filters,
    sorting
  });

  if (!employee) return null;

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
          employee={employee}
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
