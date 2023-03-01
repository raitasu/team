import { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  useCreateCertificateMutation,
  useUpdateCertificateMutation
} from '~/store/api/employees/certificate/certificate.api';
import {
  type Employee,
  type EmployeeCertificate
} from '~/store/api/employees/employees.types';

import {
  type EmployeeCertificateInfoFormValues,
  EmployeeCertificateInfoSchema
} from './EditCertificateInfo.schema';
import {
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
  employee
}: {
  certificate: EmployeeCertificate | undefined;
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}) => {
  const [t] = useTranslation();
  const methods = useForm<EmployeeCertificateInfoFormValues>({
    defaultValues: certificate
      ? getInitialState(certificate)
      : initialCertificateValues(),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeCertificateInfoSchema)
  });
  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const [createCertificate, { isLoading: isLoadingCreate }] =
    useCreateCertificateMutation();
  const [updateCertificate, { isLoading: isLoadingChange }] =
    useUpdateCertificateMutation();

  const { reset } = methods;

  useEffect(
    () =>
      reset(
        certificate ? getInitialState(certificate) : initialCertificateValues(),
        {
          keepDefaultValues: false
        }
      ),
    [reset, certificate]
  );

  const addCertificateInfo = async (values: EmployeeCertificate) => {
    try {
      await createCertificate({ ...values, employeeId: employee.id }).unwrap();
      onClose();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
      reset(initialCertificateValues(), {
        keepDefaultValues: false
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };
  const changeCertificateInfo = async (
    values: Partial<EmployeeCertificate>
  ) => {
    if (!certificate) {
      return;
    }

    try {
      await updateCertificate({
        certificate: values,
        employeeId: employee.id,
        certificateId: certificate.id
      }).unwrap();
      onClose();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (err) {
      console.error(err);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const onSubmitData = async (values: Partial<EmployeeCertificate>) => {
    if (!certificate) {
      await addCertificateInfo(values as EmployeeCertificate);
    }

    await changeCertificateInfo(values);
  };

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.education.certificate'
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
          onReset={() => reset()}
          onSubmit={methods.handleSubmit((data) => {
            const { start_date, end_date, ...payload } = data;

            const validDate = {
              start_date:
                start_date.month && start_date.year
                  ? new Date(+start_date.year, +start_date.month).toISOString()
                  : new Date().toISOString(),
              end_date:
                end_date.month && end_date.year
                  ? new Date(+end_date.year, +end_date.month).toISOString()
                  : null
            };

            const validateData = {
              ...payload,
              ...validDate
            };

            if (!certificate) {
              return onSubmitData(validateData);
            }

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

            return onSubmitData(updatedCertificates);
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoadingChange || isLoadingCreate}
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
