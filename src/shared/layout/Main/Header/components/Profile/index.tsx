import { Box, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Profile } from '~/shared/layout/Main/Header/components/Profile/Profile';
import { selectCurrentEmployee } from '~/shared/store/api/employees/employees.selectors';
import { loggedOut } from '~/shared/store/slices/authentication/authentication.slice';
import { useAppDispatch, useAppSelector } from '~/shared/store/store.hooks';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';

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
        title={t('titles:auth.log_out_title')}
        description={t('titles:auth.log_out_description')}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => dispatch(loggedOut())}
      />
    </Box>
  );
};
