import { z } from 'zod';

import { TranslationSchema } from '~/store/api/api.types';
import { EmployeeCountriesSchema } from '~/store/api/employees/employees.schemas';

export type EmployeeEducationInfoFormValues = z.infer<
  typeof EmployeeEducationInfoSchema
>;
export type ChangedEmployeeEducationInfoValues = {
  [DataKey in keyof EmployeeEducationInfoFormValues]?: EmployeeEducationInfoFormValues[DataKey];
};
export const EmployeeEducationInfoSchema = z.object({
  university_name: TranslationSchema,
  degree: TranslationSchema,
  field_of_study: TranslationSchema,
  country: EmployeeCountriesSchema,
  startMonth: z.number(),
  startYear: z.number(),
  endMonth: z.number(),
  endYear: z.number()
});
