import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetCustomersQuery } from '~/store/api/workExperience/workExperience.api';

import { type CreateProjectFormValues } from '../project.schema';

export const CompanyName = () => {
  const [t] = useTranslation();
  const { field } = useController<CreateProjectFormValues, 'company_name'>({
    name: 'company_name'
  });

  const { data: customers } = useGetCustomersQuery();

  const options = useMemo(
    () =>
      customers
        ? customers.map((item) => ({
            label: item.name,
            value: String(item.id)
          }))
        : [],
    [customers]
  );

  const selectedCompanyName = useMemo(
    () =>
      field.value.label
        ? options.find((item) => item.label === field.value.label)
        : null,
    [field.value, options]
  );

  return (
    <FormControl label={t('domains:projects.titles.company_name')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        isClearable
        options={options}
        value={selectedCompanyName}
        onChange={(option) => {
          if (option) {
            field.onChange(option);
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
