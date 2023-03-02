import { z } from 'zod';

import {
  isValidDateObject,
  isValidDocsFile,
  isValidUrl,
  isValidAndRequiredDate,
  isAbsentOrValidDate
} from '~/shared/utils/dates.utils';

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
        if (!isValidDocsFile(element)) {
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
      .refine((data) => isValidUrl(data), {
        message: 'incorrect_link'
      }),
    start_date: StartDateSchema.superRefine((value, ctx) => {
      if (!isValidAndRequiredDate(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'incorrect_date',
          path: ['month']
        });
      }

      return value;
    }),
    end_date: EndDateSchema.superRefine((value, ctx) => {
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
  .refine((data) => isValidDateObject(data.start_date, data.end_date), {
    message: 'invalid_range',
    path: ['end_date.month']
  })
  .refine((data) => data.file !== null || data.link, {
    message: 'add_file',
    path: ['link']
  });
