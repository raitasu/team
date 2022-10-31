import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageTitle } from '~/shared/layout/Page/PageTitle';
import { useGetEmployeeQuery } from '~/shared/store/api/employees/employees.api';
import { PageLoader } from '~/shared/ui/components/PageLoader';

export const Employee = () => {
  const [t] = useTranslation();
  const { id } = useParams();

  const { data, error, isLoading } = useGetEmployeeQuery(id ? +id : skipToken);

  return (
    <PageContainer>
      <PageTitle title={t('navigation:links.profile')} />
      {isLoading && <PageLoader />}
      {data && JSON.stringify(data)}
      {error && JSON.stringify(error)}
    </PageContainer>
  );
};
