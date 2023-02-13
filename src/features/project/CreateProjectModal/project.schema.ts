import { getYear } from 'date-fns';
import { z } from 'zod';

import { isNumber } from '~/shared/shared.constants';
import {
  ProjectStatusesSchema,
  ProjectTypesSchema
} from '~/store/api/employees/employees.schemas';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>;
export type StartDateType = z.infer<typeof StartDateSchema>;
export type EndDateType = z.infer<typeof EndDateSchema>;

const currentYear = getYear(new Date());

const StartDateSchema = z.object({
  startMonth: z.string().nullable(),
  startYear: z.string().nullable()
});

const EndDateSchema = z.object({
  endMonth: z.string().nullable(),
  endYear: z.string().nullable()
});

export const CreateProjectSchema = z
  .object({
    avatar: z
      .instanceof(File)
      .nullable()
      .superRefine((f, ctx) => {
        if (f === null) {
          return null;
        }

        if (typeof f === 'string') {
          return false;
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File must be one of jpeg, jpg, png, webp but was ${f.type}`
          });
        }

        return null;
      }),
    name: z.string().min(1, 'required_field'),
    company_name: z.object({
      label: z.string().nullable(),
      value: z.string().nullable()
    }),
    status: ProjectStatusesSchema.nullable(),
    type: ProjectTypesSchema.nullable(),
    managers: z
      .object({
        label: z.string().nullable(),
        value: z.string().nullable()
      })
      .array(),
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

      if (
        data.startDate.startYear === data.endDate.endYear &&
        data.startDate.startMonth &&
        data.endDate.endMonth
      ) {
        return data.startDate.startMonth <= data.endDate.endMonth;
      }

      return data.startDate.startYear <= data.endDate.endYear;
    },
    {
      message: 'invalid_range',
      path: ['endDate.endMonth']
    }
  );

export type PartialProject = Partial<CreateProjectFormValues>;
