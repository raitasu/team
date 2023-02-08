import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { type Employee } from '~/store/api/employees/employees.types';

export const getInitialState = (
  employee: Employee
): EmployeeGeneralInfoFormValues => ({
  about: employee.about ? employee.about : '',
  clothingSize: employee.t_shirt_size ? employee.t_shirt_size : null,
  gender: employee.gender ? employee.gender : null,
  dateOfBirth: employee.date_of_birth ? employee.date_of_birth : '',
  interests: employee.interests,
  startCareer: employee.start_career_at ? employee.start_career_at : ''
});
