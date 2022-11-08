import { Box, Flex } from '@chakra-ui/react';

import { getTotalPages } from '~/shared/shared.utils';
import { useGetEmployeesQuery } from '~/shared/store/api/employees/employees.api';
import { selectCurrentEmployee } from '~/shared/store/api/employees/employees.selectors';
import { selectEmployeesPagination } from '~/shared/store/slices/employees/employees.selectors';
import {
  toggleElementsPerPage,
  togglePage
} from '~/shared/store/slices/employees/employees.slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/store.hooks';
import { Pagination } from '~/shared/ui/components/Pagination';

import { EmployeesTable } from './EmployeesTable';

export const EmployeesTableContainer = () => {
  const pagination = useAppSelector(selectEmployeesPagination);
  const dispatch = useAppDispatch();
  const { data } = useGetEmployeesQuery({
    page: pagination.currentPage,
    elementsPerPage: pagination.elementsPerPage
  });
  const { data: employee } = useAppSelector(selectCurrentEmployee);

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
      maxH="100%"
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
        <EmployeesTable
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
