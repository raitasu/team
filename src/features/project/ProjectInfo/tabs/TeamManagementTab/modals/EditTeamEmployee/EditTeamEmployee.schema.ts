import { z } from 'zod';

import {
  isEmptyOrValidDate,
  isValidAndRequiredDate,
  isValidWorkPeriod
} from '~/shared/utils/dates.utils';

export type EditTeamEmployeeFormValues = z.infer<typeof EditTeamEmployeeSchema>;
export const EditTeamEmployeeSchema = z.object({
  work_experience_positions: z.array(
    z
      .object({
        position_id: z
          .number()
          .nullable()
          .superRefine((val, ctx) => {
            if (!val) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'required_field'
              });
            }

            return val;
          }),
        start_date: z
          .object({
            month: z.string().nullable(),
            year: z.string().nullable()
          })
          .superRefine((value, ctx) => {
            if (!isValidAndRequiredDate(value)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'required_field',
                path: ['month']
              });
            }

            return value;
          }),
        end_date: z
          .object({
            month: z.string().nullable(),
            year: z.string().nullable()
          })
          .superRefine((value, ctx) => {
            if (!isEmptyOrValidDate(value)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'required_field',
                path: ['month']
              });
            }

            return value;
          }),
        id: z.number().optional(),
        work_experience_id: z.number().nullable().optional()
      })
      .refine((data) => isValidWorkPeriod(data.start_date, data.end_date), {
        message: 'invalid_range',
        path: ['end_date.month']
      })
  )
});
