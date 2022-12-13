import { Box, Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import {
  type ChangedContactsInfoValues,
  EmployeeContactsInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.utils';
import { InputContactField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/InputContactField';
import { SelectContactField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/Fields/SelectContactField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { Button } from '~/shared/ui/components/Button';
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
          <InputContactField
            name="primaryPhone"
            label={TranslationKeys.primaryPhone}
            isRequired
            errorMessage={
              methods.formState.errors.primaryPhone?.message
                ? t(
                    `general_errors:${
                      methods.formState.errors.primaryPhone
                        .message as 'required_field'
                    }`
                  )
                : undefined
            }
          />
          <Box>
            <Button
              variant="primaryOutline"
              outline="none"
              boxShadow="none"
              leftIcon={<MdAdd />}
              margin="auto"
            >
              {t(
                'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_secondary'
              )}
            </Button>
          </Box>

          <InputContactField
            isRequired
            name="emergencyContact"
            label={TranslationKeys.emergencyContact}
          />
          <Box>
            <Button
              variant="primaryOutline"
              outline="none"
              boxShadow="none"
              leftIcon={<MdAdd />}
              margin="auto"
            >
              {t(
                'domains:employee.titles.profile_tabs.personal_information.contacts.emergency'
              )}
            </Button>
          </Box>
          <InputContactField
            isRequired
            name="email"
            label={TranslationKeys.email}
            errorMessage={
              methods.formState.errors.email?.message
                ? t(
                    `general_errors:${
                      methods.formState.errors.email.message as 'invalid_email'
                    }`
                  )
                : undefined
            }
          />
          <Grid
            gridTemplateColumns="1fr 1fr"
            gap={COLUMN_GAP}
          >
            <SelectContactField
              data={
                contacts.address?.city
                  ? contacts.address.city
                  : { en: t('domains:employee.errors.no_data') }
              }
              name="country"
              label={TranslationKeys.country}
            />
            <SelectContactField
              data={
                contacts.address?.city
                  ? contacts.address.city
                  : { en: t('domains:employee.errors.no_data') }
              }
              name="city"
              label={TranslationKeys.city}
            />
          </Grid>
          <SelectContactField
            data={
              contacts.address?.city
                ? contacts.address.city
                : { en: t('domains:employee.errors.no_data') }
            }
            name="timeZone"
            label={TranslationKeys.timeZone}
          />
          <Grid
            gridTemplateColumns="1fr 1fr"
            gap={COLUMN_GAP}
          >
            <InputContactField
              name="street"
              label={TranslationKeys.street}
            />
            <InputContactField
              name="ZIPCode"
              label={TranslationKeys.ZIPCode}
            />
          </Grid>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            gap={COLUMN_GAP}
          >
            <InputContactField
              name="building"
              label={TranslationKeys.building}
            />
            <InputContactField
              name="unit"
              label={TranslationKeys.unit}
            />
            <InputContactField
              name="apartment"
              label={TranslationKeys.apartment}
            />
          </Grid>
        </Flex>
      </FormProvider>
    </BaseModal>
  );
};
