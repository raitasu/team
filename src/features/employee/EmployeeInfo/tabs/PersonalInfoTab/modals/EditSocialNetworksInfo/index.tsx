import { useEffect, useMemo } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ChangedContactsInfoValues } from 'src/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useUpdateContactInfoMutation } from '~/store/api/employees/contactInfo/contactInfo.api';
import {
  type Employee,
  type EmployeeContactInfo
} from '~/store/api/employees/employees.types';

import { getInitialState } from './EditSocialNetwork.utils';
import { socialFieldsNames } from './EditSocialNetworks.constants';
import { EditSocialNetworksSchema } from './EditSocialNetworks.schema';
import { SocialLinkField } from './Fields/SocialLinkField';

export const EditSocialNetworksInfoModal = ({
  contacts,
  isOpenModal,
  onCloseModal,
  employee
}: {
  contacts: EmployeeContactInfo;
  isOpenModal: boolean;
  onCloseModal: () => void;
  employee: Employee;
}) => {
  const [t] = useTranslation();

  const [updateContactInfo, { isLoading }] = useUpdateContactInfoMutation();

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const changeContactsInfo = async (values: ChangedContactsInfoValues) => {
    try {
      await updateContactInfo({
        data: values,
        id: employee.id
      }).unwrap();
      onCloseModal();
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

  const methods = useForm({
    defaultValues: getInitialState(contacts),
    mode: 'onBlur',
    resolver: zodResolver(EditSocialNetworksSchema)
  });

  const { reset } = methods;

  const defaultData = useMemo(() => getInitialState(contacts), [contacts]);

  useEffect(() => reset({ ...defaultData }), [reset, defaultData]);

  const closeForm = () => {
    methods.reset();
    onCloseModal();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.social_network_title'
      ).toUpperCase()}
      isOpen={isOpenModal}
      onClose={closeForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const changedValues = Object.entries(data).filter(
              (_, i) =>
                Object.entries(data)[i][1] !==
                Object.entries(getInitialState(contacts))[i][1]
            );

            return changeContactsInfo(Object.fromEntries(changedValues));
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
          {Object.values(socialFieldsNames).map((link) => (
            <SocialLinkField
              key={link}
              linkName={link}
            />
          ))}
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
