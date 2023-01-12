import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { Button } from '~/shared/ui/components/Button';
import { type EmployeeLanguage } from '~/store/api/employees/employees.types';

import {
  EmployeeLanguageValidationSchema,
  type ChangedEmployeeLanguageInfoValues
} from './EditLanguagesInfo.shema';
import { LanguageField } from './fields/LanguageField';

export const EditLanguagesInfoModal = ({
  languages,
  isOpenLanguagesInfoTab,
  onCloseLanguagesInfoTab,
  onConfirm
}: {
  languages: EmployeeLanguage[];
  isOpenLanguagesInfoTab: boolean;
  onCloseLanguagesInfoTab: () => void;
  onConfirm: (values: ChangedEmployeeLanguageInfoValues) => void;
}) => {
  const [t] = useTranslation();

  const methods = useForm<ChangedEmployeeLanguageInfoValues>({
    defaultValues: { languages },
    mode: 'onBlur',
    resolver: zodResolver(EmployeeLanguageValidationSchema)
  });

  const closeLanguageslInfoForm = () => {
    methods.reset();
    setTimeout(onCloseLanguagesInfoTab, 0);
  };

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `languages`
  });

  const onRemove = (index: number) => remove(index);

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
          onSubmit={methods.handleSubmit((data) => {
            const changedValues = Object.entries(data).filter(
              (_, i) =>
                Object.entries(data)[i][1] !==
                Object.entries({ languages })[i][1]
            );

            onConfirm(Object.fromEntries(changedValues));
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
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
