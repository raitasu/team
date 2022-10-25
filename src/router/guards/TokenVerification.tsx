import React from 'react';

import { LocalStorageKey } from '~/shared/shared.constants';
import { useGetCurrentUserQuery } from '~/shared/store/api/user.api';
import { PageLoader } from '~/shared/ui/components/PageLoader';

export const TokenVerification = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const token = localStorage.getItem(LocalStorageKey.AuthToken);
  const { isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return children;
};
