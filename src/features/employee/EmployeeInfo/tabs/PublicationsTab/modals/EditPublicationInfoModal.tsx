import React, { useMemo } from 'react';

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
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

export const EditPublicationInfoModal = ({
  publication,
  onConfirm,
  isOpen,
  onClose,
  isLoading
}: {
  publication: EmployeePublication | undefined;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onConfirm: (
    values:
      | ChangedEmployeePublicationInfoValues
      | EmployeePublicationInfoFormValues
  ) => void;
}) => {
  const [t] = useTranslation();

  const defaultData = useMemo(
    () =>
      publication ? getInitialState(publication) : initialPublicationValues(),
    [publication]
  );

  const methods = useForm<EmployeePublicationInfoFormValues>({
    defaultValues: defaultData,
    mode: 'onBlur',
    resolver: zodResolver(EmployeePublicationInfoSchema)
  });
  const { reset } = methods;

  const closePublicationInfoForm = () => {
    reset();
    onClose();
  };

  React.useEffect(() => reset({ ...defaultData }), [reset, defaultData]);

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.publications.name'
      ).toUpperCase()}
      isOpen={isOpen}
      onClose={closePublicationInfoForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closePublicationInfoForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            if (!publication) {
              onConfirm(data);
              setTimeout(() => reset({ ...defaultData }), 0);
            } else {
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

              onConfirm(updatedPublications);
            }
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
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
