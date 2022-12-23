import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { degrees } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Constants';
import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const DegreeField = () => {
  const { field } = useController<EmployeeEducationInfoFormValues, 'degree'>({
    name: 'degree'
  });
  const [t, { language }] = useTranslation();

  const degreeOptions = useMemo(
    () =>
      degrees.map((degree) => ({
        value: degree.en,
        label: getTranslation(degree, language)
      })),
    [language]
  );

  const selectedDegree = degreeOptions.find(
    (degree) => degree.value === field.value.en
  );

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.degree')}
      isRequired
    >
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={degreeOptions}
        value={selectedDegree}
        onChange={(option) => {
          field.onChange(option.map((item) => item.value));
        }}
        isMulti
        size="md"
      />
    </FormControl>
  );
};