import { getMonth, getYear, set } from 'date-fns';

import {
  type CreateEmployeeWorkExperience,
  type EmployeeWorkExperience
} from '~/store/api/employees/employees.types';

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
  project: workExperience?.project.name
    ? {
        name: workExperience.project.name,
        id: String(workExperience.project.id)
      }
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

export const transformData = (
  filters: Partial<EmployeeWorkExperienceFormValues>
): Partial<CreateEmployeeWorkExperience> => {
  const data: Partial<CreateEmployeeWorkExperience> = {};

  (
    Object.keys(filters) as (keyof Partial<EmployeeWorkExperienceFormValues>)[]
  ).forEach((key) => {
    switch (key) {
      case 'project': {
        const value = filters[key];

        if (value && value.name) {
          data.project_name = value.name;
        }

        break;
      }

      case 'positions': {
        const value = filters[key];

        if (value) {
          data.position_ids = value.map((position) => Number(position.value));
        }

        break;
      }

      case 'hard_skills': {
        const value = filters[key];

        if (value) {
          data.hard_skill_ids = value.map((hardSkill) =>
            Number(hardSkill.value)
          );
        }

        break;
      }

      case 'ended_at':
      case 'started_at': {
        const value = filters[key];

        if (value) {
          const newDate =
            value.year && value.month
              ? new Date(Number(value.year), Number(value.month)).toISOString()
              : undefined;

          data[key] = newDate;
        }

        break;
      }

      case 'hiredAt': {
        break;
      }

      default: {
        const value = filters[key];

        if (value) {
          data[key] = value;
          break;
        }
      }
    }
  });

  return data;
};
