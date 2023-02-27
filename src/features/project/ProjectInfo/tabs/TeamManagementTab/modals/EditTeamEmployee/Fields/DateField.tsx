import { Grid, Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { type EditTeamEmployeeFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/EditTeamEmployee.schema';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const DateField = ({ index }: { index: number }) => {
  const [t] = useTranslation();
  const { field: startField } = useController<
    EditTeamEmployeeFormValues,
    `work_experience_positions.${number}.start_date`
  >({
    name: `work_experience_positions.${index}.start_date`
  });
  const { field: endField } = useController<
    EditTeamEmployeeFormValues,
    `work_experience_positions.${number}.end_date`
  >({
    name: `work_experience_positions.${index}.end_date`
  });

  const {
    register,
    formState: { errors },
    getValues
  } = useFormContext<EditTeamEmployeeFormValues>();

  const startYear = getValues(
    `work_experience_positions.${index}.start_date.year`
  );
  const endYear = getValues(`work_experience_positions.${index}.end_date.year`);

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap={COLUMN_GAP}
    >
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.start_date')}
        errorMessage={
          errors.work_experience_positions?.[index]?.start_date?.month?.message
            ? t(
                `general_errors:${
                  errors.work_experience_positions[index]?.start_date?.month
                    ?.message as 'required_field'
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
            isClearable
            onChange={(selectedOption) => {
              startField.onChange({
                year: startYear,
                month:
                  selectedOption === null ? null : String(selectedOption.value)
              });
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) =>
                  String(month.value) === String(startField.value.month)
              ) ?? null
            }
            placeholder={t('general_placeholders:month')}
          />
          <Tooltip
            hasArrow
            place="top"
            labelText={t('enums:notes.start_year')}
          >
            <Input
              {...register(
                `work_experience_positions.${index}.start_date.year`
              )}
              onBlur={(val) => {
                if (val.target.value.trim() === '') {
                  startField.onChange({
                    year: null,
                    month: startField.value.month
                  });
                }

                startField.onBlur();
              }}
              placeholder={t('general_placeholders:year')}
            />
          </Tooltip>
        </Grid>
      </FormControl>
      <FormControl
        label={t('domains:employee.titles.profile_tabs.education.end_date')}
        errorMessage={
          errors.work_experience_positions?.[index]?.end_date?.month?.message
            ? t(
                `general_errors:${
                  errors.work_experience_positions[index]?.end_date?.month
                    ?.message as 'required_field'
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
            isClearable
            onChange={(selectedOption) => {
              endField.onChange({
                year: endYear,
                month:
                  selectedOption === null ? null : String(selectedOption.value)
              });
            }}
            options={optionMonth}
            getOptionLabel={(option) => t(option.label)}
            value={
              optionMonth.find(
                (month) => String(month.value) === String(endField.value.month)
              ) ?? null
            }
            placeholder={t('general_placeholders:month')}
          />
          <Tooltip
            hasArrow
            place="top"
            labelText={t('enums:notes.end_year')}
          >
            <Input
              {...register(`work_experience_positions.${index}.end_date.year`)}
              onBlur={(val) => {
                if (val.target.value.trim() === '') {
                  endField.onChange({
                    year: null,
                    month: endField.value.month
                  });
                }

                endField.onBlur();
              }}
              placeholder={t('general_placeholders:year')}
            />
          </Tooltip>
        </Grid>
      </FormControl>
    </Grid>
  );
};
