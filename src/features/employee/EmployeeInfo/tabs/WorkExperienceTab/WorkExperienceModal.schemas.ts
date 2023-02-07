import { getYear } from 'date-fns';
import { z } from 'zod';

import { isNumber } from '~/shared/shared.constants';

export type EmployeeWorkExperienceFormValues = z.infer<
  typeof EmployeeWorkExperienceSchema
>;

export type StartDateType = z.infer<typeof StartDateSchema>;
export type EndDateType = z.infer<typeof EndDateSchema>;

const StartDateSchema = z.object({
  startMonth: z.string().nullable(),
  startYear: z.string().nullable()
});

const EndDateSchema = z.object({
  endMonth: z.string().nullable(),
  endYear: z.string().nullable()
});

const currentYear = getYear(new Date());

export const EmployeeWorkExperienceSchema = z
  .object({
    company_name: z.string().trim().min(1, 'required_field').nullable(),
    hard_skills: z
      .object({
        label: z.string().nullable(),
        value: z.string().nullable()
      })
      .array()
      .min(1, 'required_field'),
    project_name: z
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
    startDate: StartDateSchema.superRefine((value, ctx) => {
      if (
        (value.startMonth && !value.startYear) ||
        (!value.startMonth && value.startYear)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_field',
          path: ['startMonth']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (
        (value.startYear && !isNumber.test(value.startYear)) ||
        currentYear <= Number(value.startYear)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['startMonth']
        });
      }

      return value;
    }),
    endDate: EndDateSchema.superRefine((value, ctx) => {
      if (
        (value.endMonth && !value.endYear) ||
        (!value.endMonth && value.endYear)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_field',
          path: ['endMonth']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (
        (value.endYear && !isNumber.test(value.endYear)) ||
        currentYear <= Number(value.endYear)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['endMonth']
        });
      }

      return value;
    })
  })
  .refine(
    (data) => {
      if (data.startDate.startYear === null || data.endDate.endYear === null)
        return true;

      return data.startDate.startYear <= data.endDate.endYear;
    },
    {
      message: 'invalid_range',
      path: ['endDate.endMonth']
    }
  );

export type PartialWorkExperience = Partial<EmployeeWorkExperienceFormValues>;
