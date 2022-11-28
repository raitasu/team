import { z } from 'zod';

import { TranslationSchema } from '~/store/api/api.types';
import { EmployeeStatusSchema } from '~/store/api/employees/employees.schemas';

export type CreateEmployeeFormValues = z.infer<typeof CreateEmployeeSchema>;
export const CreateEmployeeSchema = z.object({
  first_name_translations: TranslationSchema.extend({
    en: z.string().min(1, 'required_field')
  }),
  last_name_translations: TranslationSchema.extend({
    en: z.string().min(1, 'required_field')
  }),
  email: z.string().email('invalid_email'),
  status: EmployeeStatusSchema,
  avatar: z.instanceof(File).nullable()
});

export type CreateEmployeeValues = z.infer<typeof CreateEmployeeSchema>;
