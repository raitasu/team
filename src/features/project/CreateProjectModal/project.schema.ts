import { z } from 'zod';

import {
  isValidDateObject,
  isValidImageFile,
  ACCEPTED_IMAGE_TYPES,
  isAbsentOrValidDate
} from '~/shared/utils/dates.utils';
import {
  ProjectStatusesSchema,
  ProjectTypesSchema
} from '~/store/api/employees/employees.schemas';

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>;
export type StartDateType = z.infer<typeof StartDateSchema>;
export type EndDateType = z.infer<typeof EndDateSchema>;

const StartDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

const EndDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

export const CreateProjectSchema = z
  .object({
    avatar: z
      .instanceof(File)
      .nullable()
      .superRefine((item, ctx) => {
        if (item && !isValidImageFile(item)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File must be one of ${ACCEPTED_IMAGE_TYPES.join(
              ', '
            )} but was ${item instanceof File ? item.type : item}`
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
    type: ProjectTypesSchema,
    managers: z
      .object({
        label: z.string().nullable(),
        value: z.string().nullable()
      })
      .array(),
    startDate: StartDateSchema.superRefine((value, ctx) => {
      if (!isAbsentOrValidDate(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['month']
        });
      }

      return value;
    }),
    endDate: EndDateSchema.superRefine((value, ctx) => {
      if (!isAbsentOrValidDate(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['month']
        });
      }

      return value;
    })
  })
  .refine((data) => isValidDateObject(data.startDate, data.endDate), {
    message: 'invalid_range',
    path: ['endDate.endMonth']
  });

export type PartialProject = Partial<CreateProjectFormValues>;
