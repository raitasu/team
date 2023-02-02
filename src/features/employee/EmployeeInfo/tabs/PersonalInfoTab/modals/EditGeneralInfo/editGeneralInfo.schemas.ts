import { z } from 'zod';

import {
  EmployeeClothingSizesSchema,
  EmployeeGendersSchema
} from '~/store/api/employees/employees.schemas';

export type EmployeeGeneralInfoFormValues = z.infer<
  typeof EmployeeGeneralInfoSchema
>;
export type ChangedEmployeeGeneralInfoValues = {
  [DataKey in keyof EmployeeGeneralInfoFormValues]?: EmployeeGeneralInfoFormValues[DataKey];
};
export const EmployeeGeneralInfoSchema = z.object({
  about: z.string().trim().min(1, { message: 'required_field' }),
  clothingSize: EmployeeClothingSizesSchema.nullable(),
  gender: EmployeeGendersSchema.nullable(),
  dateOfBirth: z.string().datetime({ offset: true }),
  interests: z.string(),
  startCareer: z.string().datetime()
});
