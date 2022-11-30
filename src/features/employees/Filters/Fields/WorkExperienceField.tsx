import { useController } from 'react-hook-form';

import { type EmployeeFilterValues } from '~/features/employees/Filters/employeesFilters.schema';
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
    keyof EmployeeFilterValues,
    'work_experience_start' | 'work_experience_end'
  >;
  placeholder: string;
}) => {
  const { field } = useController<EmployeeFilterValues, typeof name>({
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
    />
  );
};
