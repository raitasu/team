import { z } from 'zod';

import { createUnionSchema } from '~/shared/helpers.zod';

const ProjectStatuses = [
  'in_progress',
  'on_hold',
  'completed',
  'wasted'
] as const;

const ProjectTypes = ['external', 'internal'] as const;
const ProjectStatusSchema = createUnionSchema(ProjectStatuses);
const ProjectTypesSchema = createUnionSchema(ProjectTypes);

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: ProjectStatusSchema,
  project_type: ProjectTypesSchema,
  team: z
    .object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string().nullable()
    })
    .array(),
  links: z.string(),
  customer_name: z.string().nullable(),
  contractor_name: z.string().nullable(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable()
});
