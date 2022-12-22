import { Grid, Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const DateField = () => {
  const [t] = useTranslation();
  const { field: startMonthField } = useController<
    EmployeeEducationInfoFormValues,
    'startMonth'
  >({
    name: 'startMonth'
  });
  const { field: endMonthField } = useController<
    EmployeeEducationInfoFormValues,
    'endMonth'
  >({
    name: 'endMonth'
  });
  const { register } = useFormContext<EmployeeEducationInfoFormValues>();

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap={COLUMN_GAP}
    >
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.start_date')}
        isRequired
      >
        <Grid
          gridTemplateColumns="1fr 1fr"
          gap={COLUMN_GAP}
        >
          <Select
            onChange={(selectedOption) => {
              if (selectedOption) {
                startMonthField.onChange(selectedOption.value);
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) => month.value === startMonthField.value
              ) ?? null
            }
          />

          <Input {...register('startYear')} />
        </Grid>
      </FormControl>
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.end_date')}
      >
        <Grid
          gridTemplateColumns="1fr 1fr"
          gap={COLUMN_GAP}
        >
          <Select
            onChange={(selectedOption) => {
              if (selectedOption) {
                endMonthField.onChange(selectedOption.value);
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) => month.value === endMonthField.value
              ) ?? null
            }
          />
          <Input {...register('endYear')} />
        </Grid>
      </FormControl>
    </Grid>
  );
};
