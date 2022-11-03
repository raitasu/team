import { Box } from '@chakra-ui/react';

import { getTotalPages } from '~/shared/shared.utils';
import { useGetEmployeesQuery } from '~/shared/store/api/employees/employees.api';
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

  if (!data) return null;

  const totalPages = getTotalPages(
    data.total_count,
    pagination.elementsPerPage
  );

  return (
    <>
      <EmployeesTable data={data.items} />
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
    </>
  );
};
