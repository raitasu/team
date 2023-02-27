import { z } from 'zod';

import { Patterns } from '~/shared/shared.constants';
import {
  ACCEPTED_IMAGE_TYPES,
  isValidImageFile
} from '~/shared/utils/files.utils';
import {
  EmployeeClothingSizesSchema,
  EmployeeGendersSchema,
  EmployeeStatusSchema
} from '~/store/api/employees/employees.schemas';

export type EmployeeGeneralInfoFormValues = z.infer<
  typeof EmployeeGeneralInfoSchema
>;
export type ChangedEmployeeGeneralInfoValues = {
  [DataKey in keyof EmployeeGeneralInfoFormValues]?: EmployeeGeneralInfoFormValues[DataKey];
};

export const EmployeeGeneralInfoSchema = z.object({
  first_name: z.string().min(1, 'required_field'),
  last_name: z.string().min(1, 'required_field'),
  status: EmployeeStatusSchema,
  avatar: z
    .string()
    .or(z.instanceof(File))
    .nullable()
    .superRefine((item, ctx) => {
      if (item && !isValidImageFile(item)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File must be one of ${ACCEPTED_IMAGE_TYPES.join(
            ', '
          )} but was ${item instanceof File ? item.type : item}`
        });
      }

      return null;
    }),
  about: z.string().trim().min(1, { message: 'required_field' }),
  sweat_shirt_size: EmployeeClothingSizesSchema.nullable(),
  t_shirt_size: EmployeeClothingSizesSchema.nullable(),
  gender: EmployeeGendersSchema.nullable(),
  date_of_birth: z.string().datetime({ offset: true }),
  interests: z.string(),
  startMonth: z.number().nullable().optional(),
  startYear: z
    .number()
    .superRefine((arg, ctx) => {
      if (!Patterns.Date.test(String(arg))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date'
        });
      }
    })
    .optional(),
  hired_at: z.string().nullable()
});
