import { getMonth, getYear } from 'date-fns';

import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const getInitialState = (education: EmployeeEducation) => ({
  university_name: education.university_name_translations,
  degree: education.degree,
  field_of_study: education.speciality_translations,
  country: education.country_code,
  startMonth: getMonth(new Date(education.start_at)),
  startYear: getYear(new Date(education.start_at)),
  endMonth: getMonth(new Date(education.end_at)),
  endYear: getYear(new Date(education.end_at))
});
