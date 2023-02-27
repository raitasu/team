import { z } from 'zod';

import {
  isValidWorkPeriod,
  isValidAndRequiredDate,
  isEmptyOrValidDate
} from '~/shared/utils/dates.utils';
import { EmployeeDegreesSchema } from '~/store/api/employees/employees.schemas';

export type EmployeeEducationInfoFormValues = z.infer<
  typeof EmployeeEducationDefaultInfoSchema
>;
export type ChangedEmployeeEducationInfoValues = {
  [DataKey in keyof EmployeeEducationInfoFormValues]?: EmployeeEducationInfoFormValues[DataKey];
};

const StartDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

const EndDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
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
      if (!isValidAndRequiredDate(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['month']
        });
      }

      return value;
    }),
    endDate: EndDateSchema.superRefine((value, ctx) => {
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
  .refine((data) => isValidWorkPeriod(data.startDate, data.endDate), {
    message: 'invalid_range',
    path: ['endDate.month']
  });
