import { getMonth, getYear, set } from 'date-fns';

import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';

import { type EmployeeWorkExperienceFormValues } from './WorkExperienceModal.schemas';

export const getChangedDate = (year: number, month: number) => {
  const newDate = set(new Date(), {
    year,
    month
  });

  return newDate.toISOString();
};

export const getInitialValues = (
  workExperience?: EmployeeWorkExperience,
  hiredAt?: string | null
): EmployeeWorkExperienceFormValues => ({
  company_name: workExperience?.company_name || null,
  hard_skills:
    workExperience?.hard_skills.map((hardSkill) => ({
      label: hardSkill.name,
      value: String(hardSkill.id)
    })) || [],
  project_name: workExperience?.project_name
    ? { name: workExperience.project_name, id: null }
    : { id: null, name: null },
  description: workExperience?.description || null,
  positions:
    workExperience?.positions.map((position) => ({
      label: position.name,
      value: String(position.id)
    })) || [],
  responsibilities: workExperience?.responsibilities || null,
  started_at: {
    month: workExperience?.started_at
      ? String(getMonth(new Date(workExperience.started_at)))
      : null,
    year: workExperience?.started_at
      ? String(getYear(new Date(workExperience.started_at)))
      : null
  },
  ended_at: {
    month: workExperience?.ended_at
      ? String(getMonth(new Date(workExperience.ended_at)))
      : null,
    year: workExperience?.ended_at
      ? String(getYear(new Date(workExperience.ended_at)))
      : null
  },
  hiredAt: hiredAt || null
});
