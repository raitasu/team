import { useEffect, useMemo } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FetchBaseQueryError,
  skipToken
} from '@reduxjs/toolkit/dist/query/react';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useUpdateContactInfoMutation } from '~/store/api/employees/contactInfo/contactInfo.api';
import { type EmployeeContactInfo } from '~/store/api/employees/employees.types';

import { getInitialState } from './EditSocialNetwork.utils';
import { socialFieldsNames } from './EditSocialNetworks.constants';
import { EditSocialNetworksSchema } from './EditSocialNetworks.schema';
import { SocialLinkField } from './Fields/SocialLinkField';
import { type ChangedContactsInfoValues } from '../EditContactsInfo/EditContactsInfo.schemas';

export const EditSocialNetworksInfoModal = ({
  contacts,
  isOpenModal,
  onCloseModal
}: {
  contacts: EmployeeContactInfo;
  isOpenModal: boolean;
  onCloseModal: () => void;
}) => {
  const [t] = useTranslation();

  const { id } = useParams();

  const employeeId = id ? +id : Number(skipToken);

  const [updateContactInfo, { isLoading }] = useUpdateContactInfoMutation();

  const errorToast = useErrorToast({ ...toastConfig });
  const successToast = useSuccessToast({ ...toastConfig });

  const changeContactsInfo = async (values: ChangedContactsInfoValues) => {
    const response = await updateContactInfo({
      data: values,
      id: employeeId
    });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onCloseModal();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
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
      title={upperCase(
        t(
          'domains:employee.titles.profile_tabs.personal_information.social_network_title'
        )
      )}
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
