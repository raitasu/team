import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';

import { isEditable } from '~/features/employee/employee.utils';
import {
  type ChangedEmployeeEducationInfoValues,
  type EmployeeEducationInfoFormValues,
  EmployeeEducationInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.utils';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/CountryField';
import { DateField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/DateFIeld';
import { DegreeField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/DegreeField';
import { StudyField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/StudyField';
import { UniversityNameField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/UniversityNameField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const EditEducationInfoModal = ({
  education,
  employeeId,
  onConfirm
}: {
  education: EmployeeEducation;
  employeeId: number;
  onConfirm: (values: ChangedEmployeeEducationInfoValues) => void;
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenEducationInfoTab,
    onOpen: onOpenEducationInfoTab,
    onClose: onCloseEducationInfoTab
  } = useDisclosure();
  const { data: currentUser } = useGetCurrentUserQuery();
  const onEdit = isEditable(employeeId, currentUser)
    ? onOpenEducationInfoTab
    : undefined;

  const methods = useForm<EmployeeEducationInfoFormValues>({
    defaultValues: getInitialState(education),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeEducationInfoSchema)
  });
  const closeEducationInfoForm = () => {
    methods.reset();
    onCloseEducationInfoTab();
  };

  return (
    <>
      {onEdit ? (
        <Box pt="40px">
          <Tooltip
            hasArrow
            place="top"
            labelText={t('domains:employee.actions.edit_block')}
          >
            <IconButton
              aria-label="DownloadCV"
              variant="iconButtonSmall"
              icon={<MdOutlineEdit />}
              onClick={onOpenEducationInfoTab}
              gridColumn="2 / 3"
            />
          </Tooltip>
        </Box>
      ) : null}
      <BaseModal
        autoFocus={false}
        title={upperCase(
          t(
            'domains:employee.titles.profile_tabs.personal_information.education.section_title'
          )
        )}
        isOpen={isOpenEducationInfoTab}
        onClose={closeEducationInfoForm}
        shouldUseOverlay
        isCentered
        contentProps={{
          maxWidth: '688px'
        }}
        footer={
          <ActionsModalFooter
            onCancel={closeEducationInfoForm}
            onReset={() => methods.reset()}
            onSubmit={methods.handleSubmit((data) => {
              const changedValues = Object.entries(data).filter(
                (_, i) =>
                  Object.entries(data)[i][1] !==
                  Object.entries(getInitialState(education))[i][1]
              );

              onConfirm(Object.fromEntries(changedValues));
            })}
            isValid={methods.formState.isValid}
            isTouched={methods.formState.isDirty}
          />
        }
      >
        <Flex
          flexDirection="column"
          gap="20px"
        >
          <FormProvider {...methods}>
            <UniversityNameField />
            <DegreeField />
            <StudyField />
            <CountryField />
            <DateField />
          </FormProvider>
        </Flex>
      </BaseModal>
    </>
  );
};
