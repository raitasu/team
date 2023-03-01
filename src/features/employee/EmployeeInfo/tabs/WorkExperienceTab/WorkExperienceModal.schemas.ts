import { getYear } from 'date-fns';
import { z } from 'zod';

import { isNumber } from '~/shared/shared.constants';

export type EmployeeWorkExperienceFormValues = z.infer<
  typeof EmployeeWorkExperienceSchema
>;

const StartDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

const EndDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

const currentYear = getYear(new Date());

const baseWorkExperienceSchema = z.object({
  company_name: z.string().trim().min(1, 'required_field').nullable(),
  hard_skills: z
    .object({
      label: z.string().nullable(),
      value: z.string().nullable()
    })
    .array()
    .min(1, 'required_field'),
  project: z
    .object({
      name: z.string().nullable(),
      id: z.string().nullable()
    })
    .superRefine((val, ctx) => {
      if (!val.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_field'
        });
      }

      return val;
    }),
  description: z.string().trim().min(1, 'required_field').nullable(),
  positions: z
    .object({
      label: z.string().nullable(),
      value: z.string().nullable()
    })
    .array()
    .min(1, 'required_field'),
  responsibilities: z.string().trim().min(1, 'required_field').nullable(),

  hiredAt: z.string().nullable(), // TODO: Need to configure validation
  started_at: StartDateSchema.superRefine((value, ctx) => {
    if ((value.month && !value.year) || (!value.month && value.year)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'required_field',
        path: ['month']
      });
    }

    return value;
  }).superRefine((value, ctx) => {
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
  ended_at: EndDateSchema.superRefine((value, ctx) => {
    if ((value.month && !value.year) || (!value.month && value.year)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'required_field',
        path: ['month']
      });
    }

    return value;
  }).superRefine((value, ctx) => {
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
});

export const EmployeeWorkExperienceSchema = baseWorkExperienceSchema.refine(
  (data) => {
    if (data.started_at.year === null || data.ended_at.year === null)
      return true;

    if (
      data.started_at.year === data.ended_at.year &&
      data.started_at.month &&
      data.ended_at.month
    ) {
      return data.started_at.month <= data.ended_at.month;
    }

    return data.started_at.year <= data.ended_at.year;
  },
  {
    message: 'invalid_range',
    path: ['ended_at.month']
  }
);
export const ShortEmployeeWorkExperienceSchema = baseWorkExperienceSchema.pick({
  responsibilities: true,
  hard_skills: true
});
