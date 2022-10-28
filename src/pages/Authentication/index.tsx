import { Spinner } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { AuthBox } from '~/features/authentication/components/AuthBox';
import { ErrorMessage } from '~/features/authentication/components/ErrorMessage';
import {
  useGetAccessTokenQuery,
  useGetCurrentUserQuery
} from '~/shared/store/api/authentication/authentication.api';

export const Authentication = () => {
  const [t] = useTranslation();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const { data, error, isLoading } = useGetAccessTokenQuery(code ?? skipToken);
  const { isLoading: isLoadingUser } = useGetCurrentUserQuery(undefined, {
    skip: !data?.access_token
  });

  return (
    <AuthBox>
      {isLoading || isLoadingUser ? <Spinner /> : null}
      {error ? <ErrorMessage message={t('errors:auth.no_access')} /> : null}
    </AuthBox>
  );
};
