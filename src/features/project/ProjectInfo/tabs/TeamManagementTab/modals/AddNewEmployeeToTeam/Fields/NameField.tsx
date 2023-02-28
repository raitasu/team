import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectTeamFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeam.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetEmployeesQuery } from '~/store/api/employees/employees.api';

export const NameField = ({ index }: { index: number }) => {
  const {
    field,
    formState: { errors }
  } = useController<ProjectTeamFormValues, `team.${number}.employee_id`>({
    name: `team.${index}.employee_id`
  });
  const { t } = useTranslation();
  const { data: employees } = useGetEmployeesQuery({
    page: 1,
    elementsPerPage: 1000,
    filters: {}
  });

  const employeesNameOptions = employees
    ? employees.items.map((employee) => ({
        value: employee.id,
        label: `${employee.first_name} ${employee.last_name}`
      }))
    : [];

  const selectedNameValue = employeesNameOptions.filter(
    (item) => item.value === field.value
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
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        value={selectedNameValue}
        options={employeesNameOptions}
        onChange={(option) => {
          if (option) field.onChange(option.value);
        }}
      />
    </FormControl>
  );
};
