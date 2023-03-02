import { Grid, Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const StartCareerField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeGeneralInfoFormValues, 'startMonth'>({
    name: 'startMonth'
  });
  const {
    field: startYear,
    formState: { errors }
  } = useController<EmployeeGeneralInfoFormValues, 'startYear'>({
    name: 'startYear'
  });

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.start_career'
      )}
      errorMessage={
        errors.startYear
          ? t(
              `domains:employee.errors.${
                errors.startYear.message as 'incorrect_date'
              }`
            )
          : undefined
      }
    >
      <Grid
        gridTemplateColumns="1fr 1fr"
        gap={COLUMN_GAP}
      >
        <Select
          value={optionMonth.find((month) => month.value === field.value)}
          options={optionMonth}
          onChange={(month) => {
            if (month) {
              field.onChange(month.value);
            }
          }}
          getOptionLabel={(option) => t(option.label)}
        />
        <Input
          {...startYear}
          value={startYear.value}
          onChange={(event) => {
            if (/^[\d.,:]*$/.test(event.currentTarget.value))
              startYear.onChange(Number(event.currentTarget.value));
          }}
        />
      </Grid>
    </FormControl>
  );
};
