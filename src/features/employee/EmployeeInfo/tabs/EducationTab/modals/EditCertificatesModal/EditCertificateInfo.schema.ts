import getYear from 'date-fns/getYear';
import { z } from 'zod';

import { Patterns } from '~/shared/shared.constants';

const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword'];
const MAX_FILE_SIZE = 52428800;

const currentYear = getYear(new Date());

const StartDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

const EndDateSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable()
});

export type EmployeeCertificateInfoFormValues = z.infer<
  typeof CertificateDefaultInfoSchema
>;
const CertificateDefaultInfoSchema = z.object({
  name: z.string().nullable(),
  issued_by: z.string().nullable(),
  file: z.string().or(z.instanceof(File)).nullable(),
  link: z.string().nullable(),
  start_date: StartDateSchema,
  end_date: EndDateSchema
});

export const EmployeeCertificateInfoSchema = z
  .object({
    name: z.string().min(2, { message: 'required_field' }),
    issued_by: z.string().min(2, { message: 'required_field' }),
    file: z
      .string()
      .or(z.instanceof(File))
      .nullable()
      .superRefine((element, ctx) => {
        if (!element || typeof element === 'string') {
          return null;
        }

        if (
          !ACCEPTED_FILE_TYPES.includes(element.type) ||
          element.size > MAX_FILE_SIZE
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'file_format'
          });
        }

        return null;
      }),
    link: z
      .string()
      .trim()
      .optional()
      .nullable()
      .refine((data) => !data || Patterns.Link.test(data), {
        message: 'incorrect_link'
      }),
    start_date: StartDateSchema.superRefine((value, ctx) => {
      if ((value.month && !value.year) || (!value.month && value.year)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_all_date',
          path: ['month']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (
        !(value.year && Patterns.Date.test(value.year)) ||
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
    end_date: EndDateSchema.superRefine((value, ctx) => {
      if ((value.month && !value.year) || (!value.month && value.year)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required_all_date',
          path: ['month']
        });
      }

      return value;
    }).superRefine((value, ctx) => {
      if (value.year && !Patterns.Date.test(value.year)) {
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
  .refine((data) => data.file !== null || data.link, {
    message: 'add_file',
    path: ['link']
  });
