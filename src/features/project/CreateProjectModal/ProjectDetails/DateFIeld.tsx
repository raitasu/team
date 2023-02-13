import { Grid, Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type CreateProjectFormValues } from '../project.schema';

export const DateField = () => {
  const [t] = useTranslation();
  const { field: startField } = useController<
    CreateProjectFormValues,
    'startDate'
  >({
    name: 'startDate'
  });
  const { field: endField } = useController<CreateProjectFormValues, 'endDate'>(
    {
      name: 'endDate'
    }
  );

  const {
    register,
    formState: { errors },
    getValues
  } = useFormContext<CreateProjectFormValues>();

  const startYear = getValues('startDate.startYear');
  const endYear = getValues('endDate.endYear');

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap={COLUMN_GAP}
    >
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.start_date')}
        errorMessage={
          errors.startDate?.startMonth?.message
            ? t(
                `general_errors:${
                  errors.startDate.startMonth.message as 'required_field'
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
            {...startField}
            onChange={(selectedOption) => {
              if (selectedOption) {
                startField.onChange({
                  startYear,
                  startMonth: String(selectedOption.value)
                });
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) =>
                  String(month.value) === String(startField.value.startMonth)
              ) ?? null
            }
          />
          <Input
            {...register('startDate.startYear')}
            onBlur={startField.onBlur}
          />
        </Grid>
      </FormControl>
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.end_date')}
        errorMessage={
          errors.endDate?.endMonth?.message
            ? t(
                `general_errors:${
                  errors.endDate.endMonth.message as 'required_field'
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
            {...endField}
            onChange={(selectedOption) => {
              if (selectedOption) {
                endField.onChange({
                  endYear,
                  endMonth: String(selectedOption.value)
                });
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) =>
                  String(month.value) === String(endField.value.endMonth)
              ) ?? null
            }
          />
          <Input
            {...register('endDate.endYear')}
            onBlur={endField.onBlur}
          />
        </Grid>
      </FormControl>
    </Grid>
  );
};
