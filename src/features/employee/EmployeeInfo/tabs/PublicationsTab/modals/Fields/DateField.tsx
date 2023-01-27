import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeePublicationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { DatePicker } from '~/shared/ui/components/DatePicker';
import { FormControl } from '~/shared/ui/components/FormControl';

export const DateField = () => {
  const { field } = useController<
    EmployeePublicationInfoFormValues,
    'start_date'
  >({
    name: 'start_date'
  });
  const { t } = useTranslation();

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.publications.date')}
      isRequired
    >
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => field.onChange(date?.toISOString())}
      />
    </FormControl>
  );
};
