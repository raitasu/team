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
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';

export const CreateEmployeeModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [t] = useTranslation();
  const methods = useForm<CreateEmployeeFormValues>({
    defaultValues: {
      avatar: null,
      first_name_translations: {
        en: ''
      },
      last_name_translations: {
        en: ''
      },
      email: '',
      status: 'active'
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateEmployeeSchema)
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      shouldUseOverlay
      title={t('domains:employee.actions.add_employee')}
      contentProps={{
        maxWidth: '90%',
        width: 'fit-content'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onClose}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit((r) => {
            console.debug(r);
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
          <EmployeeAvatar />
          <EmployeeDetails />
        </Grid>
      </FormProvider>
    </BaseModal>
  );
};
