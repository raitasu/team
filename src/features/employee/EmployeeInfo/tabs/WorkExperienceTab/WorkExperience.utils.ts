import { getMonth, getYear, set } from 'date-fns';

import {
  type Customers,
  type EmployeePosition,
  type HardSkill,
  type EmployeeWorkExperience
} from '~/store/api/employees/employees.types';

import { type EmployeeWorkExperienceFormValues } from './WorkExperienceModal.schemas';

export const getOptions = (
  value: Customers[] | HardSkill[] | EmployeePosition[] | undefined
) =>
  value
    ? value.map((item) => ({
        label: item.name,
        value: String(item.id)
      }))
    : [];

export const getChangedDate = (year: number, month: number) => {
  const newDate = set(new Date(), {
    year,
    month
  });

  return newDate.toISOString();
};

export const getInitialStateForUpdate = (
  workExperience: EmployeeWorkExperience
): EmployeeWorkExperienceFormValues => ({
  company_name: workExperience.company_name || '',
  hard_skills: workExperience.hard_skills.map((hardSkill) => ({
    label: hardSkill.name,
    value: String(hardSkill.id)
  })),
  project_name: { name: workExperience.project_name, id: null },
  description: workExperience.description,
  positions: workExperience.positions.map((position) => ({
    label: position.name,
    value: String(position.id)
  })),
  responsibilities: workExperience.responsibilities,
  startDate: {
    startMonth: String(getMonth(new Date(workExperience.started_at))),
    startYear: String(getYear(new Date(workExperience.started_at)))
  },
  endDate: {
    endMonth: String(getMonth(new Date(workExperience.ended_at))),
    endYear: String(getYear(new Date(workExperience.ended_at)))
  }
});

export const getInitialStateForCreate =
  (): EmployeeWorkExperienceFormValues => ({
    company_name: null,
    hard_skills: [],
    project_name: { id: null, name: null },
    description: null,
    positions: [],
    responsibilities: null,
    startDate: {
      startMonth: null,
      startYear: null
    },
    endDate: {
      endMonth: null,
      endYear: null
    }
  });
