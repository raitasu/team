import { Spinner } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthBox } from '~/features/authentication/components/AuthBox';
import { ErrorMessage } from '~/features/authentication/components/ErrorMessage';
import { PagePaths } from '~/router/router.constants';
import {
  useGetAccessTokenQuery,
  useGetCurrentUserQuery
} from '~/store/api/authentication/authentication.api';

export const Authentication = () => {
  const [t] = useTranslation();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const { data, error, isLoading } = useGetAccessTokenQuery(code ?? skipToken);
  const { isLoading: isLoadingUser } = useGetCurrentUserQuery(undefined, {
    skip: !data?.access_token
  });

  if (!code) {
    return <Navigate to={PagePaths.Login} />;
  }

  return (
    <AuthBox>
      {isLoading || isLoadingUser ? <Spinner /> : null}
      {error ? (
        <ErrorMessage message={t('domains:authorization.errors.no_access')} />
      ) : null}
    </AuthBox>
  );
};
