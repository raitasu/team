import { z } from 'zod';

import { createUnionSchema } from '~/shared/helpers.zod';

import { EmployeeStatusSchema } from '../employees/employees.schemas';

const ProjectStatuses = [
  'in_progress',
  'on_hold',
  'completed',
  'wasted'
] as const;

const ProjectTypes = ['external', 'internal'] as const;
const ProjectStatusSchema = createUnionSchema(ProjectStatuses);
const ProjectTypesSchema = createUnionSchema(ProjectTypes);

export type WorkExperiencePositions = z.infer<
  typeof WorkExperiencePositionsSchema
>;
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
  links: z.string().optional(),
  contractor: z.object({
    id: z.number(),
    name: z.string().nullable()
  }),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable()
});

export const ManagersSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().nullable(),
  status: EmployeeStatusSchema.nullable().optional()
});

const WorkExperiencePositionsSchema = z.object({
  id: z.number(),
  work_experience_id: z.number(),
  position_id: z.number().nullable(),
  start_date: z.string().datetime().nullable(),
  end_date: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable()
});

const PositionsSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable()
});

const WorkExperienceSchema = z.object({
  id: z.number().nullable().optional(),
  work_experience_positions: WorkExperiencePositionsSchema.array(),
  nowadays: z.boolean(),
  positions: PositionsSchema.array()
});

export const MemberTeamSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().nullable(),
  work_experience: WorkExperienceSchema.array()
});
