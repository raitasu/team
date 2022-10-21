import { Spinner } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthBox } from 'features/auth/components/AuthBox';
import { ErrorMessage } from 'features/auth/components/ErrorMessage';
import { useGetAccessTokenQuery } from 'features/auth/slice/authService.slice';

export const Auth = () => {
  const [t] = useTranslation();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const { data, error, isLoading } = useGetAccessTokenQuery(code ?? skipToken);

  let content = <>{t('titles:auth.token')}</>;
  if (error) {
    content = <ErrorMessage />;
  }
  if (isLoading) {
    content = <Spinner />;
  }

  if (data) {
    return <Navigate to="/" />;
  }

  return <AuthBox>{content}</AuthBox>;
};
