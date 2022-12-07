import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { type Employee } from '~/store/api/employees/employees.types';

export const getInitialState = (
  employee: Employee
): EmployeeGeneralInfoFormValues => ({
  about: employee.about_translations.en,
  clothingSize: employee.clothing_size,
  gender: employee.gender,
  dateOfBirth: employee.date_of_birth,
  interest: employee.interests_translations.en,
  startCareer: employee.start_career_at
});
