import { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { TableLoader } from '~/features/employees/Tables/components/TableLoader';
import { type EmployeesTable } from '~/features/employees/Tables/tables.types';
import { Pagination } from '~/shared/ui/components/Pagination';
import { getTotalPages } from '~/shared/utils/pagination.utils';
import { useGetEmployeesQuery } from '~/store/api/employees/employees.api';
import { selectCurrentEmployee } from '~/store/api/employees/employees.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const EmployeesTablesContainer = ({
  table: Table
}: {
  table: EmployeesTable;
}) => {
  const [t] = useTranslation();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: employee } = useAppSelector(selectCurrentEmployee);

  const { data, isFetching, isError } = useGetEmployeesQuery({
    page: pageIndex,
    elementsPerPage: pageSize
  });
  const totalPages = getTotalPages(data?.page.total_count || 0, pageSize);

  if (!employee) return null;
  if (isError) return <Text>{t('domains:employee.errors.no_data')}</Text>;

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
          currentPage={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
        />
      </Box>
    </Flex>
  );
};
