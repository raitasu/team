import { z } from 'zod';

import { TranslationSchema } from '~/store/api/api.types';

export type EmployeeEducationInfoFormValues = z.infer<
  typeof EmployeeEducationInfoSchema
>;
export type ChangedEmployeeEducationInfoValues = {
  [DataKey in keyof EmployeeEducationInfoFormValues]?: EmployeeEducationInfoFormValues[DataKey];
};
export const EmployeeEducationInfoSchema = z
  .object({
    university_name: TranslationSchema.extend({
      en: z.string().min(2, 'required_field')
    }),
    degree: z.string().min(1, 'required_field'),
    field_of_study: TranslationSchema.extend({
      en: z.string().min(2, 'required_field')
    }),
    country: z.string().nullable(),
    startMonth: z.number(),
    startYear: z.string().regex(/^19|20\d{2}$/i, { message: 'incorrect_date' }),
    endMonth: z.number(),
    endYear: z
      .string()
      .regex(/^19\d{2}|20\d{2}$/i, { message: 'incorrect_date' })
      .optional()
  })
  .refine(
    (data) => {
      if (
        Number(data.startYear) === Number(data.endYear) &&
        Number(data.startYear) <= new Date().getFullYear()
      ) {
        return Number(data.startMonth) < Number(data.endMonth);
      }

      return (
        Number(data.startYear) <= new Date().getFullYear() ||
        Number(data.startYear) < Number(data.endYear)
      );
    },
    { message: 'incorrect_date' }
  );
