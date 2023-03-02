import { getMonth, getYear } from 'date-fns';

import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const getInitialState = (education: EmployeeEducation) => ({
  university_name: education.university_name,
  degree: education.degree,
  speciality: education.speciality,
  country: education.country,
  nowadays: false,
  startDate: {
    month: getMonth(new Date(education.started_at)).toString(),
    year: getYear(new Date(education.started_at)).toString()
  },
  endDate: {
    month: education.graduated_at
      ? getMonth(new Date(education.graduated_at)).toString()
      : null,
    year: education.graduated_at
      ? getYear(new Date(education.graduated_at)).toString()
      : null
  },
  started_at: education.started_at,
  graduated_at: education.graduated_at
});

export const initialEducationValues = () => ({
  university_name: null,
  degree: null,
  speciality: null,
  country: null,
  nowadays: false,
  startDate: {
    month: null,
    year: null
  },
  endDate: {
    month: null,
    year: null
  }
});
