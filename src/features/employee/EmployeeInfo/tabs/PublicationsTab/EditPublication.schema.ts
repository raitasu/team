import { isBefore } from 'date-fns';
import { z } from 'zod';

import { isValidUrl } from '~/shared/utils/dates.utils';
import { isValidDocsFile } from '~/shared/utils/files.utils';

export type EmployeePublicationInfoFormValues = z.infer<
  typeof PublicationDefaultInfoSchema
>;
export type ChangedEmployeePublicationInfoValues = {
  [DataKey in keyof EmployeePublicationInfoFormValues]?: EmployeePublicationInfoFormValues[DataKey];
};

const PublicationDefaultInfoSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string().nullable(),
  file: z.string().nullable(),
  start_date: z.string().nullable()
});

export const EmployeePublicationInfoSchema = z
  .object({
    name: z.string().min(1, { message: 'required_field' }),
    description: z.string().min(1, { message: 'required_field' }),
    url: z
      .string()
      .trim()
      .optional()
      .nullable()
      .refine((data) => isValidUrl(data), {
        message: 'incorrect_link'
      }),
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
    start_date: z
      .string()
      .datetime({ offset: true })
      .refine((date) => !isBefore(new Date(), new Date(date)), {
        message: 'incorrect_date',
        path: ['start_date']
      })
  })
  .superRefine((arg, ctx) => {
    if (arg.url || arg.file) {
      return false;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'link_description',
      path: ['fileURL']
    });

    return true;
  });

export type EmployeePublicationValues = z.infer<
  typeof EmployeePublicationInfoSchema
>;
