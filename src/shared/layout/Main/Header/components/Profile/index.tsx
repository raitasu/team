import { Box, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Profile } from '~/shared/layout/Main/Header/components/Profile/Profile';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { selectCurrentEmployee } from '~/store/api/employees/employees.selectors';
import { loggedOut } from '~/store/slices/authentication/authentication.slice';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: employee } = useAppSelector(selectCurrentEmployee);
  const [t] = useTranslation();

  if (!employee) {
    return null;
  }

  return (
    <Box>
      <Profile
        employee={employee}
        onLogout={onOpen}
      />
      <ConfirmationModal
        title={t('domains:authorization.actions.sign_out')}
        description={t('domains:authorization.actions.sign_out_confirmation')}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => dispatch(loggedOut())}
      />
    </Box>
  );
};
