import { useEffect } from 'react';

import { Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedContactsInfoValues,
  EmployeeContactsInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.utils';
import { ApartmentField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/ApartmentField';
import { BuildingFiled } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/BuildingFiled';
import { CityField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/CityField';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/CountryField';
import { EmergencyContactField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyContactField';
import { EmergencyNameField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyNameField';
import { EmergencyOwnerField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyOwnerField';
import { PersonalEmailField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/PersonalEmailField';
import { PrimaryMobileField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/PrimaryMobileField';
import { SecondaryMobileField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/SecondaryMobileField';
import { StreetField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/StreetField';
import { TimeZoneField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/TimeZoneField';
import { UnitField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/UnitField';
import { WorkEmailField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/WorkEmailField';
import { ZIPCodeField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/ZIPCodeField';
import { COLUMN_GAP } from '~/pages/Employee/employee.styles';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useUpdateContactInfoMutation } from '~/store/api/employees/contactInfo/contactInfo.api';
import {
  type Employee,
  type EmployeeContactInfo
} from '~/store/api/employees/employees.types';

export const EditContactsInfoModal = ({
  contacts,
  employee,
  isOpenGeneralInfoTab,
  onCloseGeneralInfoTab
}: {
  employee: Employee;
  contacts: EmployeeContactInfo;
  isOpenGeneralInfoTab: boolean;
  onCloseGeneralInfoTab: () => void;
}) => {
  const [t] = useTranslation();

  const methods = useForm({
    defaultValues: getInitialState(contacts, false),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeContactsInfoSchema)
  });

  const { reset } = methods;

  const [updateContactInfo, { isLoading }] = useUpdateContactInfoMutation();

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const changeContactsInfo = async (values: ChangedContactsInfoValues) => {
    try {
      await updateContactInfo({
        data: values,
        id: employee.id
      }).unwrap();
      onCloseGeneralInfoTab();
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

  useEffect(() => {
    reset(getInitialState(contacts));
  }, [reset, contacts]);

  const onCloseTab = () => {
    reset();
    onCloseGeneralInfoTab();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.contacts.section_title'
      ).toUpperCase()}
      isOpen={isOpenGeneralInfoTab}
      onClose={onCloseTab}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onCloseTab}
          onReset={() => methods.reset(getInitialState(contacts))}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit((data) => {
            const initialValues = getInitialState(contacts, true);
            const updatedContacts = (
              Object.keys(data) as (keyof typeof data)[]
            ).reduce<ChangedContactsInfoValues>((acc, key) => {
              const currentValue = data[key];
              const initialValue = initialValues[key];

              if (!isEqual(currentValue, initialValue)) {
                (acc[key] as typeof currentValue) = currentValue;
              }

              return acc;
            }, {});

            return changeContactsInfo(updatedContacts);
          })}
          submitTag="save"
          isLoading={isLoading}
        />
      }
    >
      <FormProvider {...methods}>
        <Flex
          flexDirection="column"
          gap="20px"
        >
          <PrimaryMobileField />
          <SecondaryMobileField />
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            gap={COLUMN_GAP}
          >
            <EmergencyContactField />
            <EmergencyNameField />
            <EmergencyOwnerField />
          </Grid>
          <WorkEmailField />
          <PersonalEmailField />
          <Grid
            gridTemplateColumns="1fr 1fr"
            gap={COLUMN_GAP}
          >
            <CountryField />
            <CityField />
          </Grid>
          <TimeZoneField />
          <Grid
            gridTemplateColumns="1fr 1fr"
            gap={COLUMN_GAP}
          >
            <StreetField />
            <ZIPCodeField />
          </Grid>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            gap={COLUMN_GAP}
          >
            <BuildingFiled />
            <UnitField />
            <ApartmentField />
          </Grid>
        </Flex>
      </FormProvider>
    </BaseModal>
  );
};
