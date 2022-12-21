import { type SyntheticEvent } from 'react';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdSearch } from 'react-icons/md';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const NameField = () => {
  const { register, setValue } = useFormContext<EmployeeFiltersForm>();
  const [t] = useTranslation();

  return (
    <FormControl label={t('domains:filters.employees')}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="brand.lightGray"
        >
          <MdSearch size="20px" />
        </InputLeftElement>
        <Input
          {...register('name', {
            onBlur: ({
              currentTarget: { value }
            }: SyntheticEvent<HTMLInputElement>) => {
              setValue('name', value.trim() || null, {
                shouldValidate: true,
                shouldDirty: true
              });
            }
          })}
          type="search"
          placeholder={t('domains:filters.placeholders.placeholder_name')}
        />
      </InputGroup>
    </FormControl>
  );
};
