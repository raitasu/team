import { useEffect } from 'react';

import { Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthBox } from 'features/auth/components/AuthBox';
import { ErrorMessage } from 'features/auth/components/ErrorMessage';
import { updateAccessToken } from 'features/auth/slice/auth.slice';
import { useGetAccessTokenQuery } from 'features/auth/slice/authService.slice';

import { useAppDispatch } from 'shared/store/store.hooks';

export const Auth = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const params = new URLSearchParams(search);
  const code = params.get('code') || '';
  const accessTokenQueryResult = useGetAccessTokenQuery(code, {
    skip: !code
  });
  const { data, error, isLoading } = accessTokenQueryResult;
  useEffect(() => {
    if (data?.access_token) {
      dispatch(updateAccessToken(data.access_token));
      navigate('/');
    }
  }, [dispatch, data, navigate]);

  let content = <>{t('titles:auth.token')}</>;
  if (error) {
    content = <ErrorMessage />;
  }
  if (isLoading) {
    content = <Spinner />;
  }
  return <AuthBox>{content}</AuthBox>;
};
