import React from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedEmployeePublicationInfoValues,
  type EmployeePublicationInfoFormValues,
  EmployeePublicationInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import {
  getInitialState,
  initialPublicationValues
} from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublicationInfo.utils';
import { DateField } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/Fields/DateField';
import { DescriptionField } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/Fields/DescriptionField';
import { LinkPublicationField } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/Fields/LinkPublicationField';
import { TitleField } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/Fields/TitleField';
import { UploadFilePublicationField } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/Fields/UploadFilePublicationField';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  type Employee,
  type EmployeePublication
} from '~/store/api/employees/employees.types';
import {
  useCreatePublicationMutation,
  useUpdatePublicationsMutation
} from '~/store/api/publications/publications.api';

export const EditPublicationInfoModal = ({
  publication,
  isOpen,
  onClose,
  employee
}: {
  employee: Employee;
  publication: EmployeePublication | undefined;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [t] = useTranslation();
  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);
  const [createPublication, { isLoading: isLoadingCreate }] =
    useCreatePublicationMutation();
  const [updatePublications, { isLoading: isLoadingUpdate }] =
    useUpdatePublicationsMutation();

  const methods = useForm<EmployeePublicationInfoFormValues>({
    defaultValues: publication
      ? getInitialState(publication)
      : initialPublicationValues(),
    mode: 'onBlur',
    resolver: zodResolver(EmployeePublicationInfoSchema)
  });
  const { reset } = methods;

  React.useEffect(
    () =>
      reset(
        publication ? getInitialState(publication) : initialPublicationValues(),
        { keepDefaultValues: false }
      ),
    [reset, publication]
  );

  const createPublicationInfo = async (
    values: EmployeePublicationInfoFormValues
  ) => {
    try {
      await createPublication({
        data: values,
        employeeId: employee.id
      }).unwrap();
      onClose();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
      reset(initialPublicationValues(), {
        keepDefaultValues: false
      });
    } catch (e) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const updatePublicationInfo = async (
    values: ChangedEmployeePublicationInfoValues
  ) => {
    if (!publication) {
      return;
    }

    try {
      await updatePublications({
        data: values,
        employeeId: employee.id,
        publicationId: publication.id
      }).unwrap();
      onClose();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const onSubmitData = async (
    values:
      | EmployeePublicationInfoFormValues
      | ChangedEmployeePublicationInfoValues
  ) => {
    if (!publication) {
      await createPublicationInfo(values as EmployeePublicationInfoFormValues);
    }

    await updatePublicationInfo(values as ChangedEmployeePublicationInfoValues);
  };

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.publications.name'
      ).toUpperCase()}
      isOpen={isOpen}
      onClose={onClose}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onClose}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            if (!publication) {
              return onSubmitData(data);
            }

            const initialValues = getInitialState(publication);
            const updatedPublications = (
              Object.keys(data) as (keyof typeof data)[]
            ).reduce<Partial<typeof data>>((acc, key) => {
              const currentValue = data[key];
              const initialValue = initialValues[key];

              if (!isEqual(currentValue, initialValue)) {
                (acc[key] as typeof currentValue) = currentValue;
              }

              return acc;
            }, {});

            return onSubmitData(updatedPublications);
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoadingCreate || isLoadingUpdate}
        />
      }
    >
      <Flex
        flexDirection="column"
        gap="20px"
      >
        <FormProvider {...methods}>
          <TitleField />
          <DescriptionField />
          <DateField />
          <LinkPublicationField />
          <UploadFilePublicationField />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
