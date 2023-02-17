import { Grid, Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const DateField = () => {
  const [t] = useTranslation();
  const { field: startField } = useController<
    EmployeeWorkExperienceFormValues,
    'started_at'
  >({
    name: 'started_at'
  });
  const { field: endField } = useController<
    EmployeeWorkExperienceFormValues,
    'ended_at'
  >({
    name: 'ended_at'
  });

  const {
    register,
    formState: { errors },
    getValues
  } = useFormContext<EmployeeWorkExperienceFormValues>();

  const startYear = getValues('started_at.year');
  const endYear = getValues('ended_at.year');

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap={COLUMN_GAP}
    >
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.start_date')}
        errorMessage={
          errors.started_at?.month?.message
            ? t(
                `general_errors:${
                  errors.started_at.month.message as 'required_field'
                }`
              )
            : undefined
        }
        isRequired
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
                  year: startYear,
                  month: String(selectedOption.value)
                });
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) =>
                  String(month.value) === String(startField.value.month)
              ) ?? null
            }
          />
          <Input
            {...register('started_at.year')}
            onBlur={startField.onBlur}
          />
        </Grid>
      </FormControl>
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.end_date')}
        errorMessage={
          errors.ended_at?.month?.message
            ? t(
                `general_errors:${
                  errors.ended_at.month.message as 'required_field'
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
                  year: endYear,
                  month: String(selectedOption.value)
                });
              }
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) => String(month.value) === String(endField.value.month)
              ) ?? null
            }
          />
          <Input
            {...register('ended_at.year')}
            onBlur={endField.onBlur}
          />
        </Grid>
      </FormControl>
    </Grid>
  );
};
