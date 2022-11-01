import { skipToken } from '@reduxjs/toolkit/query/react';
import { useParams } from 'react-router-dom';

import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { useGetEmployeeQuery } from '~/shared/store/api/employees/employees.api';
import { PageLoader } from '~/shared/ui/components/PageLoader';

export const Employee = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetEmployeeQuery(id ? +id : skipToken);

  return (
    <PageContainer>
      <PageToolbox />
      {isLoading && <PageLoader />}
      {data && JSON.stringify(data)}
      {error && JSON.stringify(error)}
    </PageContainer>
  );
};
