import { Box, useDisclosure } from '@chakra-ui/react';

import { useGetCurrentUserQuery } from '~/shared/store/api/user.api';
import { loggedOut } from '~/shared/store/slices/auth/auth.slice';
import { useAppDispatch } from '~/shared/store/store.hooks';

import { LogOutModal } from '../LogOutModal';
import { Profile } from './Profile';

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
