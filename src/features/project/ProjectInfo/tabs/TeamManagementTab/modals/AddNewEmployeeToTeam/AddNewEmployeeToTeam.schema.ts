import { z } from 'zod';

import {
  isValidWorkPeriod,
  isValidAndRequiredDate,
  isEmptyOrValidDate
} from '~/shared/utils/dates.utils';

export type ProjectTeamFormValues = z.infer<typeof AddNewEmployeeToTeamSchema>;

export const AddNewEmployeeToTeamSchema = z.object({
  team: z.array(
    z
      .object({
        employee_id: z
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
        position_id: z.array(z.number()).superRefine((val, ctx) => {
          if (val.length === 0) {
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
                message: 'incorrect_date',
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
                message: 'incorrect_date',
                path: ['month']
              });
            }

            return value;
          })
      })
      .refine((data) => isValidWorkPeriod(data.start_date, data.end_date), {
        message: 'invalid_range',
        path: ['end_date.month']
      })
  )
});
