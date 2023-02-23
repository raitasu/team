import getYear from 'date-fns/getYear';
import { z } from 'zod';

import { Patterns } from '~/shared/shared.constants';
import { EmployeeDegreesSchema } from '~/store/api/employees/employees.schemas';

export type EmployeeEducationInfoFormValues = z.infer<
  typeof EmployeeEducationDefaultInfoSchema
>;
export type ChangedEmployeeEducationInfoValues = {
  [DataKey in keyof EmployeeEducationInfoFormValues]?: EmployeeEducationInfoFormValues[DataKey];
};

const currentYear = getYear(new Date());

const StartDateSchema = z.object({
  startMonth: z.string().nullable(),
  startYear: z.string().nullable()
});

const EndDateSchema = z.object({
  endMonth: z.string().nullable(),
  endYear: z.string().nullable()
});

const EmployeeEducationDefaultInfoSchema = z.object({
  university_name: z.string().nullable(),
  degree: EmployeeDegreesSchema.nullable(),
  speciality: z.string().nullable(),
  country: z.string().nullable(),
  nowadays: z.boolean(),
  startDate: StartDateSchema,
  endDate: EndDateSchema,
  started_at: z.string().nullable(),
  graduated_at: z.string().nullable()
});

export const EmployeeEducationInfoSchema = z
  .object({
    university_name: z.string().min(2, 'required_field'),
    degree: EmployeeDegreesSchema.optional().nullable(),
    speciality: z.string().min(2, 'required_field'),
    country: z.string().optional().nullable(),
    nowadays: z.boolean(),
    startDate: StartDateSchema.superRefine((value, ctx) => {
      if (
        (value.startMonth && !value.startYear) ||
        (!value.startMonth && value.startYear)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_all_date',
          path: ['startMonth']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (
        !(value.startYear && Patterns.Date.test(value.startYear)) ||
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
          message: 'required_all_date',
          path: ['endMonth']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (value.endYear && !Patterns.Date.test(value.endYear)) {
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
        return data.startDate.startMonth < data.endDate.endMonth;
      }

      return data.startDate.startYear <= data.endDate.endYear;
    },
    {
      message: 'invalid_range',
      path: ['endDate.endMonth']
    }
  );
