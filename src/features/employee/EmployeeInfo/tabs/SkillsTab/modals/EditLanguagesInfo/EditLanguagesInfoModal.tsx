import { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FetchBaseQueryError,
  skipToken
} from '@reduxjs/toolkit/dist/query/react';
import upperCase from 'lodash/upperCase';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { Button } from '~/shared/ui/components/Button';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type EmployeeLanguage } from '~/store/api/employees/employees.types';
import { useUpdateLanguagesInfoMutation } from '~/store/api/employees/languages/languages.api';

import {
  EmployeeLanguageValidationSchema,
  type EmployeeLanguageValues,
  type LanguagesInfoFormValues
} from './EditLanguagesInfo.shema';
import { LanguageField } from './fields/LanguageField';

export const EditLanguagesInfoModal = ({
  languagesArray,
  isOpenLanguagesInfoTab,
  onCloseLanguagesInfoTab
}: {
  languagesArray: EmployeeLanguage[];
  isOpenLanguagesInfoTab: boolean;
  onCloseLanguagesInfoTab: () => void;
}) => {
  const [t] = useTranslation();

  const { id } = useParams();

  const employeeId = id ? +id : Number(skipToken);

  const methods = useForm<LanguagesInfoFormValues>({
    defaultValues: { languages: languagesArray },
    mode: 'onBlur',
    resolver: zodResolver(EmployeeLanguageValidationSchema)
  });

  const { reset } = methods;

  useEffect(
    () => reset({ languages: languagesArray }),
    [languagesArray, reset]
  );

  const closeLanguageslInfoForm = () => {
    methods.reset();
    setTimeout(onCloseLanguagesInfoTab, 0);
  };

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `languages`
  });

  const onRemove = (index: number) => remove(index);

  const [updateLanguages, { isLoading }] = useUpdateLanguagesInfoMutation();

  const errorToast = useErrorToast({ ...toastConfig });
  const successToast = useSuccessToast({ ...toastConfig });

  const changeLanguagesInfo = async (languages: EmployeeLanguageValues[]) => {
    const response = await updateLanguages({ languages, employeeId });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onCloseLanguagesInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    }
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.skills.languages')
      )}
      isOpen={isOpenLanguagesInfoTab}
      onClose={closeLanguageslInfoForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeLanguageslInfoForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) =>
            changeLanguagesInfo(data.languages)
          )}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
        />
      }
    >
      <FormProvider {...methods}>
        <Flex
          flexDirection="column"
          gap="10px"
        >
          {fields.map((lang, index) => (
            <LanguageField
              key={lang.id}
              countFields={fields.length}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </Flex>
      </FormProvider>
      <Button
        leftIcon={<MdAdd />}
        variant="primaryGhost"
        marginTop="10px"
        onClick={() => append({ name: null, level: null })}
      >
        {t('domains:filters.language')}
      </Button>
    </BaseModal>
  );
};
