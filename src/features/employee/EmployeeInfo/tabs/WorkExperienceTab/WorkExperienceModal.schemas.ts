import { z } from 'zod';

import {
  isValidWorkPeriod,
  isValidAndRequiredDate,
  isEmptyOrValidDate
} from '~/shared/utils/dates.utils';

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
    if (!isValidAndRequiredDate(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'incorrect_date',
        path: ['month']
      });
    }

    return value;
  }),
  ended_at: EndDateSchema.superRefine((value, ctx) => {
    if (!isEmptyOrValidDate(value)) {
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
  (data) => isValidWorkPeriod(data.started_at, data.ended_at),
  {
    message: 'invalid_range',
    path: ['ended_at.month']
  }
);
export const ShortEmployeeWorkExperienceSchema = baseWorkExperienceSchema.pick({
  responsibilities: true,
  hard_skills: true
});
