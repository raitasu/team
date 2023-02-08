import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { degrees } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Constants';
import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const DegreeField = () => {
  const { field } = useController<EmployeeEducationInfoFormValues, 'degree'>({
    name: 'degree'
  });
  const [t] = useTranslation();

  const degreeOptions = degrees.map((degree) => ({
    value: degree,
    label: degree
  }));

  const selectedDegree = degreeOptions.find(
    (degree) => degree.value.en === field.value
  );

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.degree')}
    >
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={degreeOptions}
        value={selectedDegree}
        onChange={(option) => {
          if (option) {
            field.onChange(option.value);
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
