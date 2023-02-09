import { set } from 'date-fns';

import { type EmployeeNewWorkExperienceFormValues } from './modals/CreateNewWorkExperience/CreateNewWorkExperienceModal.schemas';

export const getChangedDate = (year: number, month: number) => {
  const newDate = set(new Date(), {
    year,
    month
  });

  return newDate.toISOString();
};

export const getInitialState = (): EmployeeNewWorkExperienceFormValues => ({
  company_name: '',
  description: '',
  hard_skills: [],
  positions: [],
  project_name: { id: null, name: null },
  responsibilities: '',
  startDate: {
    startMonth: null,
    startYear: null
  },
  endDate: {
    endMonth: null,
    endYear: null
  }
});
