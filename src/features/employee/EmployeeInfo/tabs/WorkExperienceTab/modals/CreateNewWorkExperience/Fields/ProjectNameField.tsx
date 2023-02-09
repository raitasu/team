import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetCompanyProjectsQuery } from '~/store/api/workExperience/workExperience.api';

import { type EmployeeNewWorkExperienceFormValues } from '../CreateNewWorkExperienceModal.schemas';

export const ProjectNameField = () => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeNewWorkExperienceFormValues, `project_name`>({
    name: `project_name`
  });

  const { field: companyName } = useController<
    EmployeeNewWorkExperienceFormValues,
    `company_name`
  >({
    name: `company_name`
  });

  const { data: companyProjects } = useGetCompanyProjectsQuery(
    companyName.value ? companyName.value : ''
  );

  const companyProjectsOptions = useMemo(
    () =>
      companyProjects
        ? companyProjects.map((project) => ({
            label: project.name,
            value: String(project.id)
          }))
        : [],
    [companyProjects]
  );
  const [t] = useTranslation();

  const selectedProject = useMemo(
    () => ({ label: field.value.name || '', value: field.value.id || '' }),
    [field.value]
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
        options={companyProjectsOptions}
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
