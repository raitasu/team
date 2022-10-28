import { Box, useDisclosure } from '@chakra-ui/react';

import { LogOutModal } from '~/shared/layout/Main/Header/components/LogOutModal';
import { Profile } from '~/shared/layout/Main/Header/components/Profile/Profile';
import { selectCurrentEmployee } from '~/shared/store/api/employees/employees.selectors';
import { loggedOut } from '~/shared/store/slices/authentication/authentication.slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/store.hooks';

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: employee } = useAppSelector(selectCurrentEmployee);

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
