import { z } from 'zod';

import { isEmail } from '~/features/employee/employee.utils';
import {
  ACCEPTED_IMAGE_TYPES,
  isValidImageFile
} from '~/shared/utils/files.utils';
import { EmployeeStatusSchema } from '~/store/api/employees/employees.schemas';

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
  personal_email: z
    .string()
    .email('invalid_email')
    .optional()
    .or(z.literal('')),
  status: EmployeeStatusSchema,
  avatar: z
    .instanceof(File)
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
    })
});

export type CreateEmployeeValues = z.infer<typeof CreateEmployeeSchema>;
