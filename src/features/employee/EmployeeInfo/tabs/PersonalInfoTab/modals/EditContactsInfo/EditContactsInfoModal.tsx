import { Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedContactsInfoValues,
  EmployeeContactsInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.utils';
import { ApartmentField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/ApartmentField';
import { BuildingFiled } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/BuildingFiled';
import { CityField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/CityField';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/CountryField';
import { EmergencyContactField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyContactField';
import { EmergencyNameField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyNameField';
import { EmergencyWhoIsThisField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/EmergencyWhoIsThisField';
import { PersonalEmailField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/PersonalEmailField';
import { PrimaryMobileField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/PrimaryMobileField';
import { SecondaryMobileField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/SecondaryMobileField';
import { StreetField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/StreetField';
import { TimeZoneField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/TimeZoneField';
import { UnitField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/UnitField';
import { WorkEmailField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/WorkEmailField';
import { ZIPCodeField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/ZIPCodeField';
import { COLUMN_GAP } from '~/pages/Employee/employee.styles';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type EmployeeContact } from '~/store/api/employees/employees.types';

export const EditContactsInfoModal = ({
  contacts,
  isOpenGeneralInfoTab,
  onCloseGeneralInfoTab,
  onConfirm
}: {
  contacts: EmployeeContact;
  isOpenGeneralInfoTab: boolean;
  onCloseGeneralInfoTab: () => void;
  onConfirm: (values: ChangedContactsInfoValues) => void;
}) => {
  const [t] = useTranslation();
  const methods = useForm({
    defaultValues: getInitialState(contacts),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeContactsInfoSchema)
  });

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.section_title'
        )
      )}
      isOpen={isOpenGeneralInfoTab}
      onClose={onCloseGeneralInfoTab}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onCloseGeneralInfoTab}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit((data) => {
            const changedValues = Object.entries(data).filter(
              (_, i) =>
                Object.entries(data)[i][1] !==
                Object.entries(getInitialState(contacts))[i][1]
            );

            onConfirm(Object.fromEntries(changedValues));
          })}
          submitTag="save"
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
            <EmergencyWhoIsThisField />
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
