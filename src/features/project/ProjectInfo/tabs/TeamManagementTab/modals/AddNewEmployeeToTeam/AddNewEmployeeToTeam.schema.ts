import { getYear } from 'date-fns';
import { z } from 'zod';

import { isNumber } from '~/shared/shared.constants';

export type ProjectTeamFormValues = z.infer<typeof AddNewEmployeeToTeamSchema>;
const currentYear = getYear(new Date());

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
            if ((value.month && !value.year) || (!value.month && value.year)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'required_field',
                path: ['month']
              });
            }

            return value;
          })
          .superRefine((value, ctx) => {
            if (
              !(value.year && isNumber.test(value.year)) ||
              currentYear <= Number(value.year)
            ) {
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
            if ((value.month && !value.year) || (!value.month && value.year)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'required_field',
                path: ['month']
              });
            }

            return value;
          })
          .superRefine((value, ctx) => {
            if (
              (value.year && !isNumber.test(value.year)) ||
              currentYear <= Number(value.year)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'incorrect_date',
                path: ['month']
              });
            }

            return value;
          })
      })
      .refine(
        (data) => {
          if (data.start_date.year === null || data.end_date.year === null)
            return true;

          if (
            data.start_date.year === data.end_date.year &&
            data.start_date.month &&
            data.end_date.month
          ) {
            return data.start_date.month <= data.end_date.month;
          }

          return data.start_date.year <= data.end_date.year;
        },
        {
          message: 'invalid_range',
          path: ['end_date.month']
        }
      )
  )
});
