import { Box, useDisclosure } from '@chakra-ui/react';

import { LogOutModal } from '~/shared/layout/Main/Header/components/LogOutModal';
import { Profile } from '~/shared/layout/Main/Header/components/Profile/Profile';
import { useGetCurrentUserQuery } from '~/shared/store/api/authentication/authentication.api';
import { loggedOut } from '~/shared/store/slices/authentication/authentication.slice';
import { useAppDispatch } from '~/shared/store/store.hooks';

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { data: employee } = useGetCurrentUserQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!employee) {
    return null;
  }

  return (
    <Box>
      <Profile
        employee={employee}
        onLogout={onOpen}
      />
      <LogOutModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => dispatch(loggedOut())}
      />
    </Box>
  );
};
