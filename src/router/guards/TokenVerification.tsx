import React from 'react';

import { LocalStorageKey } from '~/shared/shared.constants';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { selectIsLoggedIn } from '~/store/slices/authentication/authentication.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const TokenVerification = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const token = localStorage.getItem(LocalStorageKey.AuthToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isLoading, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !token
  });

  if (isLoading || (isSuccess && !isLoggedIn)) {
    return <PageLoader />;
  }

  return children;
};
