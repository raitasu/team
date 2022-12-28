import { z } from 'zod';

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

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const EmployeeGeneralInfoSchema = z.object({
  first_name: z.string().min(1, 'required_field'),
  last_name: z.string().min(1, 'required_field'),
  status: EmployeeStatusSchema,
  avatar: z
    .instanceof(File)
    .nullable()
    .superRefine((f, ctx) => {
      if (f === null) {
        return null;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File must be one of jpeg, jpg, png, webp but was ${f.type}`
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
      if (!/^19\d{2}|20\d{2}$/i.test(String(arg))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date'
        });
      }
    })
    .optional(),
  start_career_at: z.string().nullable()
});
