import { useCallback, useState } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectTeamFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeam.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { AsyncSelect } from '~/shared/ui/components/Select';
import { useLazyGetEmployeesQuery } from '~/store/api/employees/employees.api';

export const NameField = ({ index }: { index: number }) => {
  const {
    field,
    formState: { errors }
  } = useController<ProjectTeamFormValues, `team.${number}.employee_id`>({
    name: `team.${index}.employee_id`
  });
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [trigger] = useLazyGetEmployeesQuery();

  const loadEmployeeOptions = useCallback(
    async (inputValue: string) => {
      const data = await trigger({
        page: 1,
        elementsPerPage: 100,
        filters: {
          name: inputValue
        }
      }).unwrap();

      return data.items.map((employee) => ({
        value: employee.id,
        label: `${employee.first_name} ${employee.last_name}`
      }));
    },
    [trigger]
  );

  return (
    <FormControl
      label={t('domains:projects.employee_name')}
      isRequired
      errorMessage={
        errors.team?.[index]?.employee_id?.message
          ? t(
              `general_errors:${
                errors.team[index]?.employee_id?.message as 'required_field'
              }`
            )
          : undefined
      }
    >
      <AsyncSelect
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        loadOptions={loadEmployeeOptions}
        onChange={(option) => {
          if (option) {
            field.onChange(option.value);
          }

          setSelectedOption(option);
        }}
        value={selectedOption}
        defaultOptions
        cacheOptions
        isMulti={false}
      />
    </FormControl>
  );
};
