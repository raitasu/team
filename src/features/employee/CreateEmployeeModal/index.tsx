import { Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CreateEmployeeFormValues,
  CreateEmployeeSchema
} from '~/features/employee/CreateEmployeeModal/employee.schema';
import { EmployeeAvatar } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar';
import { EmployeeDetails } from '~/features/employee/CreateEmployeeModal/EmployeeDetails';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useCreateEmployeeMutation } from '~/store/api/employees/employees.api';

export const CreateEmployeeModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [t] = useTranslation();
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const methods = useForm<CreateEmployeeFormValues>({
    defaultValues: {
      avatar: null,
      first_name: '',
      last_name: '',
      email: '',
      personal_email: '',
      status: 'active'
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateEmployeeSchema)
  });

  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);

  const onSubmit = async (employee: CreateEmployeeFormValues) => {
    try {
      await createEmployee(employee).unwrap();
      onClose();
      toastSuccess({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      toastError({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      shouldUseOverlay
      title={t('domains:employee.actions.create_profile').toUpperCase()}
      contentProps={{
        maxWidth: '962px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onClose}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
          onSubmit={methods.handleSubmit(onSubmit)}
          submitTag="create"
        />
      }
    >
      <FormProvider {...methods}>
        <Grid
          templateColumns="250px 1fr"
          gap="20px"
        >
          <EmployeeAvatar onReset={() => methods.resetField('avatar')} />
          <EmployeeDetails />
        </Grid>
      </FormProvider>
    </BaseModal>
  );
};
