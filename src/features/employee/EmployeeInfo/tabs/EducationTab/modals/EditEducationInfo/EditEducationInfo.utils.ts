import { getMonth, getYear } from 'date-fns';

import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const getInitialState = (education: EmployeeEducation) => ({
  university: education.university_name,
  degree: education.degree,
  field_of_study: education.speciality,
  country: education.city || '', // TODO: replace with education.country once fix would be applied on backend
  startMonth: getMonth(new Date(education.started_at)),
  startYear: getYear(new Date(education.started_at)).toString(),
  endMonth: getMonth(new Date(education.graduated_at)),
  endYear: getYear(new Date(education.graduated_at)).toString()
});
