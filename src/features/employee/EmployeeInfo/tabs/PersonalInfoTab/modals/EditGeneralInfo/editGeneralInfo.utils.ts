import { getMonth, getYear } from 'date-fns';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { type Employee } from '~/store/api/employees/employees.types';

export const getInitialState = (
  employee: Employee
): EmployeeGeneralInfoFormValues => ({
  first_name: employee.first_name,
  last_name: employee.last_name,
  status: employee.status,
  avatar: employee.avatar,
  about: employee.about || '',
  sweat_shirt_size: employee.sweat_shirt_size
    ? employee.sweat_shirt_size
    : null,
  t_shirt_size: employee.t_shirt_size || null,
  gender: employee.gender ? employee.gender : null,
  date_of_birth: employee.date_of_birth || new Date().toISOString(),
  interests: employee.interests || '',
  startMonth: employee.hired_at
    ? getMonth(new Date(employee.hired_at))
    : getMonth(new Date()),
  startYear: employee.hired_at
    ? getYear(new Date(employee.hired_at))
    : getYear(new Date()),
  hired_at: employee.hired_at
});

export const getInitialFilterState = (data: EmployeeGeneralInfoFormValues) => {
  const initialFilterState = data;

  delete initialFilterState.startMonth;
  delete initialFilterState.startYear;

  return initialFilterState;
};
