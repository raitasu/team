import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeePublicationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { DatePicker } from '~/shared/ui/components/DatePicker';
import { FormControl } from '~/shared/ui/components/FormControl';

export const DateField = () => {
  const { trigger } = useFormContext<EmployeePublicationInfoFormValues>();
  const {
    field,
    fieldState: { error }
  } = useController<EmployeePublicationInfoFormValues, 'start_date'>({
    name: 'start_date'
  });
  const { t } = useTranslation();

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.publications.date')}
      errorMessage={
        error ? t(`general_errors:incorrect_date_start`) : undefined
      }
      isRequired
    >
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => {
          field.onChange(date?.toISOString());

          return trigger('start_date');
        }}
        placeholderText={t('general_placeholders:date')}
      />
    </FormControl>
  );
};
