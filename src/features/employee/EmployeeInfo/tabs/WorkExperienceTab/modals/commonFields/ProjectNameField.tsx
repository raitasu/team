import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetCompanyProjectsQuery } from '~/store/api/workExperience/workExperience.api';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const ProjectNameField = () => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `project_name`>({
    name: `project_name`
  });

  const { field: companyName } = useController<
    EmployeeWorkExperienceFormValues,
    `company_name`
  >({
    name: `company_name`
  });

  const { data: companyProjects } = useGetCompanyProjectsQuery(
    companyName.value ? companyName.value : ''
  );

  const companyProjectsOptions = companyProjects
    ? companyProjects.map((project) => ({
        label: project.name,
        value: String(project.id)
      }))
    : [];

  const [t] = useTranslation();

  const project = useMemo(
    () =>
      field.value.name
        ? { label: field.value.name, value: field.value.id }
        : null,
    [field.value]
  );

  const filteredOptions = companyProjectsOptions.filter(
    (item) => item.label !== project?.label
  );

  const selectedProject = companyProjectsOptions.filter(
    (item) => item.label === project?.label
  );

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.work_experience.project_name'
      )}
      errorMessage={
        error?.message
          ? t(`general_errors:${error.message as 'required_field'}`)
          : undefined
      }
      isRequired
    >
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={filteredOptions}
        value={selectedProject}
        onChange={(option) => {
          if (option) {
            field.onChange({ id: option.value, name: option.label });
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
