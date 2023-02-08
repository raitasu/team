import { z } from 'zod';

import { isEmail } from '~/features/employee/employee.utils';
import { EmployeeStatusSchema } from '~/store/api/employees/employees.schemas';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export type CreateEmployeeFormValues = z.infer<typeof CreateEmployeeSchema>;
export const CreateEmployeeSchema = z.object({
  first_name: z.string().min(1, 'required_field'),
  last_name: z.string().min(1, 'required_field'),
  email: z.string().transform((val, ctx) => {
    const email = val.concat('@cybergizer.com');

    if (!isEmail(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'invalid_email'
      });
    }

    return email;
  }),
  personal_email: z.string().email('invalid_email'),
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
    })
});

export type CreateEmployeeValues = z.infer<typeof CreateEmployeeSchema>;
