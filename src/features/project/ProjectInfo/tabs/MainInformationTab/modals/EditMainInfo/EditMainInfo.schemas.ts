import { z } from 'zod';

import { businessDomains } from '~/features/employee/employee.constants';
import { createUnionSchema } from '~/shared/helpers.zod';
import { ProjectStatusesSchema } from '~/store/api/employees/employees.schemas';

export type ChangedProjectMainInfoValues = {
  [DataKey in keyof ProjectMainInfoFormValues]?: ProjectMainInfoFormValues[DataKey];
};

export type ProjectMainInfoFormValues = z.infer<typeof ProjectInfoSchema>;

export const DomainsSchema = createUnionSchema(businessDomains);

export const ProjectInfoSchema = z.object({
  avatar: z.string().or(z.instanceof(File)),
  customer_name: z.string(),
  name: z.string().min(1, 'required_field'),
  status: ProjectStatusesSchema,
  project_type: z.string(),
  started_at: z.object({
    month: z.string().nullable(),
    year: z.string().nullable()
  }),
  ended_at: z.object({
    month: z.string().nullable(),
    year: z.string().nullable()
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
});
