import { Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CreateEmployeeFormValues,
  CreateEmployeeSchema
} from '~/features/employee/CreateEmployeeModal/employee.schema';
import { EmployeeAvatar } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar';
import { EmployeeDetails } from '~/features/employee/CreateEmployeeModal/EmployeeDetails';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      shouldUseOverlay
      title={upperCase(t('domains:employee.actions.create_profile'))}
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
          onSubmit={methods.handleSubmit((employee) => {
            createEmployee(employee).then(onClose).catch(onClose);
          })}
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
