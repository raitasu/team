import React from 'react';

import { LocalStorageKey } from '~/shared/shared.constants';
import { useGetCurrentUserQuery } from '~/shared/store/api/authentication/authentication.api';
import { selectIsLoggedIn } from '~/shared/store/slices/authentication/authentication.selectors';
import { useAppSelector } from '~/shared/store/store.hooks';
import { PageLoader } from '~/shared/ui/components/PageLoader';

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
