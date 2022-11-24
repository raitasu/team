import { useEffect } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { type EmployeesTable } from '~/features/employees/Tables/tables.types';
import { useGetEmployeesQuery } from '~/shared/store/api/employees/employees.api';
import { selectCurrentEmployee } from '~/shared/store/api/employees/employees.selectors';
import { selectEmployeesPagination } from '~/shared/store/slices/employees/employees.selectors';
import {
  reset,
  toggleElementsPerPage,
  togglePage
} from '~/shared/store/slices/employees/employees.slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/store.hooks';
import { Pagination } from '~/shared/ui/components/Pagination';
import { getTotalPages } from '~/shared/utils/pagination.utils';

export const EmployeesTablesContainer = ({
  table: Table
}: {
  table: EmployeesTable;
}) => {
  const pagination = useAppSelector(selectEmployeesPagination);
  const { data: employee } = useAppSelector(selectCurrentEmployee);
  const dispatch = useAppDispatch();

  const { data } = useGetEmployeesQuery({
    page: pagination.currentPage,
    elementsPerPage: pagination.elementsPerPage
  });

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [dispatch]
  );

  if (!data) return null;
  if (!employee) return null;

  const totalPages = getTotalPages(
    data.page.total_count,
    pagination.elementsPerPage
  );

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      height="min-content"
      maxH="100%"
      width="100%"
    >
      <Box
        flex="1"
        overflow="hidden"
        minH="0"
        overflowY="auto"
        border="1px solid var(--chakra-colors-brand-stroke)"
        borderRadius="4px"
        backgroundColor="var(--chakra-colors-brand-background2)"
      >
        <Table
          data={data.items}
          employee={employee}
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
