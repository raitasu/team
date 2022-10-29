import React from 'react';

import { Box } from '@chakra-ui/react';

import { useGetEmployeesQuery } from '~/shared/store/api/employees/employees.api';
import { Pagination } from '~/shared/ui/components/Pagination';

import { EmployeesTable } from './EmployeesTable';

export const EmployeesTableContainer = () => {
  const { data } = useGetEmployeesQuery();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  if (!data) return null;

  return (
    <>
      <EmployeesTable data={data} />
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        marginTop="18px"
      >
        <Pagination
          totalPages={6}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </Box>
    </>
  );
};
