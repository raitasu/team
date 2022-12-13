import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { type Employee } from '~/store/api/employees/employees.types';

export const getInitialState = (
  employee: Employee
): EmployeeGeneralInfoFormValues => ({
  about: employee.about_translations ? employee.about_translations.en : '',
  clothingSize: employee.clothing_size ? employee.clothing_size : null,
  gender: employee.gender ? employee.gender : null,
  dateOfBirth: employee.date_of_birth ? employee.date_of_birth : '',
  interest: employee.interests_translations
    ? employee.interests_translations.en
    : '',
  startCareer: employee.start_career_at ? employee.start_career_at : ''
});
