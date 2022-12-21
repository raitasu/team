import { useController } from 'react-hook-form';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { NumberInput } from '~/shared/ui/components/NumberInput';

const getWorkFieldValue = (value: string) => {
  if (value.trim() === '') {
    return null;
  }

  const parsedNumber = parseFloat(value);

  return Number.isNaN(parsedNumber) ? value : parsedNumber;
};

export const WorkExperienceField = ({
  name,
  placeholder
}: {
  name: Extract<
    keyof EmployeeFiltersForm,
    'work_experience_start' | 'work_experience_end'
  >;
  placeholder: string;
}) => {
  const { field } = useController<EmployeeFiltersForm, typeof name>({
    name
  });

  return (
    <NumberInput
      inputFieldProps={{ placeholder }}
      ref={field.ref}
      value={field.value !== null ? field.value : ''}
      onBlur={({ currentTarget: { value } }) => {
        field.onChange(getWorkFieldValue(value));
        field.onBlur();
      }}
      onChange={field.onChange}
      width="120px"
      min={0}
      step={0.5}
    />
  );
};
