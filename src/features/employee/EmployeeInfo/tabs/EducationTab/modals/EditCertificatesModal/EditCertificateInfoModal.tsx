import { useEffect, useMemo } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

import {
  type EmployeeCertificateInfoFormValues,
  EmployeeCertificateInfoSchema
} from './EditCertificateInfo.schema';
import {
  getChangedDate,
  getInitialState,
  initialCertificateValues
} from './EditCertificateInfo.utils';
import { DateField } from './fields/DateFIeld';
import { IssuedByField } from './fields/IssuedByField';
import { LinkCertificateField } from './fields/LinkCertificateField';
import { TitleField } from './fields/TitleField';
import { UploadCertificateField } from './fields/UploadCertificateField';

export const EditCertificateInfoModal = ({
  certificate,
  isOpen,
  onClose,
  onConfirm,
  isLoading
}: {
  certificate: EmployeeCertificate | undefined;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    values: Partial<EmployeeCertificate> | EmployeeCertificate
  ) => void;
  isLoading: boolean;
}) => {
  const [t] = useTranslation();

  const defaultData = useMemo(
    () =>
      certificate ? getInitialState(certificate) : initialCertificateValues(),
    [certificate]
  );

  const methods = useForm<EmployeeCertificateInfoFormValues>({
    defaultValues: defaultData,
    mode: 'onBlur',
    resolver: zodResolver(EmployeeCertificateInfoSchema)
  });

  const { reset } = methods;

  useEffect(() => reset({ ...defaultData }), [reset, defaultData]);

  const closeCertificateInfoForm = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.education.certificate')
      )}
      isOpen={isOpen}
      onClose={closeCertificateInfoForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeCertificateInfoForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const { start_date, end_date, ...payload } = data;

            const validDate = {
              start_date:
                start_date.month && start_date.year
                  ? getChangedDate(
                      Number(start_date.year),
                      Number(start_date.month)
                    )
                  : new Date().toString(),
              end_date:
                end_date.month && end_date.year
                  ? getChangedDate(
                      Number(end_date.year),
                      Number(end_date.month)
                    )
                  : null
            };

            const validateData = {
              ...payload,
              ...validDate
            };

            if (!certificate) {
              onConfirm(validateData);
              setTimeout(() => reset({ ...defaultData }), 0);
            } else {
              const initialValues = getInitialState(certificate);
              const updatedCertificates = (
                Object.keys(data) as (keyof typeof data)[]
              ).reduce<Partial<typeof validateData>>((acc, key) => {
                const currentValue = data[key];
                const initialValue = initialValues[key];

                if (!isEqual(currentValue, initialValue)) {
                  if (key === 'end_date' || key === 'start_date') {
                    (acc[key] as typeof currentValue) =
                      data[key].year && data[key].month
                        ? new Date(
                            Number(data[key].year),
                            Number(data[key].month)
                          ).toISOString()
                        : null;
                  } else {
                    (acc[key] as typeof currentValue) = currentValue;
                  }
                }

                return acc;
              }, {});

              onConfirm(updatedCertificates);
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
          <IssuedByField />
          <DateField />
          <LinkCertificateField />
          <UploadCertificateField />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
