import { Box } from '@chakra-ui/layout';

import { useGetCVsListQuery } from '~/store/api/CV/cv.api.slice';
import { type Employee } from '~/store/api/employees/employees.types';

import { CVTableInfo } from './CVTableInfo';

export const CVTab = ({ employee }: { employee: Employee }) => {
  const { data: cvs } = useGetCVsListQuery({ employeeId: employee.id });

  return (
    <Box
      height="min-content"
      maxH="100%"
      minHeight="100%"
      width="100%"
    >
      <Box
        flex="1"
        minH="0"
        overflow="auto"
        position="relative"
        margin="0 12px"
      >
        <CVTableInfo
          data={cvs || []}
          employee={employee}
        />
      </Box>
    </Box>
  );
};
