import { Grid, useClipboard, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdLink } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { CreateCVModal } from '~/shared/ui/components/CreateCVModal';
import { useErrorToast } from '~/shared/ui/components/Toast';
import { useDeleteEmployeeMutation } from '~/store/api/employees/employees.api';
import { type Employee } from '~/store/api/employees/employees.types';

export const EmployeeProfileControls = ({
  employee
}: {
  employee: Employee;
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isOpenCvModal,
    onOpen: openCvModal,
    onClose: closeCvModal
  } = useDisclosure();
  const {
    isOpen: isDeletingUser,
    onOpen: requestConfirmation,
    onClose: denyRequest
  } = useDisclosure();
  const [deleteEmployee, { isLoading: isUpdating }] =
    useDeleteEmployeeMutation();
  const navigate = useNavigate();
  const { onCopy } = useClipboard(document.location.href);
  const errorToast = useErrorToast(toastConfig);

  return (
    <Grid rowGap="10px">
      <Button
        variant="primary"
        onClick={openCvModal}
      >
        {t('domains:employee.actions.create_cv')}
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdLink />}
        onClick={onCopy}
      >
        {t('domains:employee.actions.copy_profile')}
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdDelete />}
        onClick={requestConfirmation}
      >
        {t('domains:employee.actions.delete_profile')}
      </Button>
      <CreateCVModal
        isOpen={isOpenCvModal}
        onClose={closeCvModal}
        employeeId={employee.id}
      />
      <ConfirmationModal
        title={t('domains:employee.actions.delete_profile')}
        description={t(
          'domains:global.confirmations.descriptions.delete_employee'
        )}
        isOpen={isDeletingUser}
        onClose={denyRequest}
        isLoading={isUpdating}
        onConfirm={async () => {
          try {
            await deleteEmployee({ id: employee.id }).unwrap();

            navigate(PagePaths.Employees);
          } catch {
            errorToast({
              description: t('domains:global.errors.descriptions.unknown_error')
            });
          }
        }}
      />
    </Grid>
  );
};
