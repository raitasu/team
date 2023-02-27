import { z } from 'zod';

import { businessDomains } from '~/features/employee/employee.constants';
import { createUnionSchema } from '~/shared/helpers.zod';
import {
  isEmptyOrValidDate,
  isValidAndRequiredDate,
  isValidWorkPeriod
} from '~/shared/utils/dates.utils';
import {
  ACCEPTED_IMAGE_TYPES,
  isValidImageFile
} from '~/shared/utils/files.utils';
import { ProjectStatusesSchema } from '~/store/api/employees/employees.schemas';

export type ChangedProjectMainInfoValues = {
  [DataKey in keyof ProjectMainInfoFormValues]?: ProjectMainInfoFormValues[DataKey];
};

export type ProjectMainInfoFormValues = z.infer<typeof ProjectInfoSchema>;

export const DomainsSchema = createUnionSchema(businessDomains);

export const ProjectInfoSchema = z
  .object({
    avatar: z
      .string()
      .or(z.instanceof(File))
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
    customer_name: z.string(),
    name: z.string().min(1, 'required_field'),
    status: ProjectStatusesSchema,
    project_type: z.string(),
    started_at: z
      .object({
        month: z.string().nullable(),
        year: z.string().nullable()
      })
      .superRefine((value, ctx) => {
        if (!isValidAndRequiredDate(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'incorrect_date',
            path: ['month']
          });
        }

        return value;
      }),
    ended_at: z
      .object({
        month: z.string().nullable(),
        year: z.string().nullable()
      })
      .superRefine((value, ctx) => {
        if (!isEmptyOrValidDate(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'incorrect_date',
            path: ['month']
          });
        }

        return value;
      }),
    country_id: z.number().nullable(),
    business_domain: z
      .object({
        value: z.string(),
        label: z.string()
      })
      .nullable(),
    hard_skill_ids: z.array(z.number()),
    description: z.string(),
    challenge: z.string(),
    solution: z.string()
  })
  .refine((data) => isValidWorkPeriod(data.started_at, data.ended_at), {
    message: 'invalid_range',
    path: ['ended_at.month']
  });
