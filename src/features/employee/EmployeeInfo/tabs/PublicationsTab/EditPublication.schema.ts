import { z } from 'zod';

import { isValidUrl } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublicationInfo.utils';

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
      .superRefine((url, ctx) => {
        if (url && !isValidUrl(url))
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'incorrect_link'
          });

        return url;
      }),
    file: z.string().or(z.instanceof(File)).nullable(),
    start_date: z.string().datetime({ offset: true })
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
