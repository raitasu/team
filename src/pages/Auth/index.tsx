import { Spinner } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { AuthBox } from '~/features/auth/components/AuthBox';
import { ErrorMessage } from '~/features/auth/components/ErrorMessage';
import { useGetAccessTokenQuery } from '~/shared/store/api/auth.api';

export const Auth = () => {
  const [t] = useTranslation();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const { error, isLoading } = useGetAccessTokenQuery(code ?? skipToken);

  return (
    <AuthBox>
      {isLoading ? <Spinner /> : null}
      {error ? <ErrorMessage message={t('errors:auth.no_access')} /> : null}
    </AuthBox>
  );
};
