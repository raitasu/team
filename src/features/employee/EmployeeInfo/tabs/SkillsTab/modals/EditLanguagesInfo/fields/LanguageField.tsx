import { useMemo } from 'react';

import { Flex } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdClose } from 'react-icons/md';

import { FormControl } from '~/shared/ui/components/FormControl';
import { IconButton } from '~/shared/ui/components/IconButton';
import { Select } from '~/shared/ui/components/Select';
import {
  EmployeeLanguageLevel,
  EmployeeLanguages
} from '~/store/api/employees/employees.schemas';

import { type LanguagesInfoFormValues } from '../EditLanguagesInfo.shema';

export const LanguageField = ({
  index,
  countFields,
  onRemove
}: {
  index: number;
  countFields: number;
  onRemove: (index: number) => void;
}) => {
  const [t] = useTranslation();

  const { getValues, trigger } = useFormContext<LanguagesInfoFormValues>();

  const currentValues = getValues('languages');

  const {
    field: languageName,
    formState: { errors }
  } = useController<LanguagesInfoFormValues, `languages.${number}.name`>({
    name: `languages.${index}.name`
  });

  const { field: languageLevel } = useController<
    LanguagesInfoFormValues,
    `languages.${number}.level`
  >({
    name: `languages.${index}.level`
  });

  const languageNameOptions = useMemo(
    () =>
      EmployeeLanguages.map((lang) => ({
        value: lang,
        label: t(`enums:language.${lang}`)
      })),
    [t]
  );

  const languageLevelOptions = useMemo(
    () =>
      EmployeeLanguageLevel.map((level) => ({
        value: level,
        label: t(`enums:language_level_full.${level}`)
      })),
    [t]
  );

  const filteredOptionsName = languageNameOptions.filter(
    (el) => !currentValues.some((item) => item.name === el.value)
  );

  const errorMessageName = errors.languages?.[index]?.name?.type as
    | 'invalid_literal'
    | undefined;
  const errorMessageLevel = errors.languages?.[index]?.level?.type as
    | 'invalid_literal'
    | undefined;

  return (
    <Flex gap="8px">
      <Flex
        gap="10px"
        width="100%"
      >
        <FormControl
          label={
            index === 0
              ? t('domains:employee.titles.profile_tabs.skills.languages')
              : ''
          }
          errorMessage={
            errorMessageName !== undefined
              ? `${t(`domains:employee.errors.${errorMessageName}`)}`
              : ''
          }
          isRequired
        >
          <Select
            options={filteredOptionsName}
            onBlur={() => trigger()}
            value={languageNameOptions.find(
              (option) => option.value === languageName.value
            )}
            onChange={(option) => {
              languageName.onChange(option?.value);
            }}
          />
        </FormControl>
        <FormControl
          label={
            index === 0
              ? t('domains:employee.titles.profile_tabs.skills.possession')
              : ''
          }
          errorMessage={
            errorMessageLevel !== undefined
              ? `${t(`domains:employee.errors.${errorMessageLevel}`)}`
              : ''
          }
          isRequired
        >
          <Select
            options={languageLevelOptions}
            onBlur={() => trigger()}
            value={languageLevelOptions.find(
              (option) => option.value === languageLevel.value
            )}
            onChange={(option) => {
              languageLevel.onChange(option?.value);
            }}
          />
        </FormControl>
      </Flex>
      {countFields !== 1 && (
        <IconButton
          aria-label="Delete"
          variant="iconButtonSmall"
          icon={<MdClose />}
          onClick={() => onRemove(index)}
          alignSelf="end"
          color="brand.accentRed"
          marginBottom={
            errorMessageName !== undefined || errorMessageLevel !== undefined
              ? '30px'
              : '8px'
          }
        />
      )}
    </Flex>
  );
};
