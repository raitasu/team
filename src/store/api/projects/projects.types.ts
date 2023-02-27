import { z } from 'zod';

import { DomainsSchema } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import {
  CategoriesHardSkillSchema,
  ProjectStatusesSchema,
  ProjectTypesSchema
} from '~/store/api/employees/employees.schemas';

export type ProjectResponse = z.infer<typeof ProjectResponseSchema>;

export const ProjectResponseSchema = z.object({
  avatar: z.string().nullable().optional(),
  business_domain: DomainsSchema.nullable(),
  challenge: z.string().nullable(),
  contractor: z.string().nullable(),
  country: z
    .object({
      id: z.number(),
      name: z.string()
    })
    .nullable(),
  customer: z
    .object({
      id: z.number(),
      name: z.string()
    })
    .nullable(),
  description: z.string().nullable(),
  ended_at: z.string().nullable(),
  hard_skills: z
    .array(
      z.object({
        category: CategoriesHardSkillSchema,
        id: z.number(),
        name: z.string()
      })
    )
    .nullable(),
  id: z.number(),
  managers: z.string().array().nullable(),
  name: z.string().nullable(),
  project_type: ProjectTypesSchema,
  solution: z.string().nullable(),
  started_at: z.string().nullable(),
  status: ProjectStatusesSchema,
  team: z.array(
    z.object({
      first_name: z.string(),
      id: z.number(),
      last_name: z.string(),
      work_experience: z.array(
        z.object({
          work_experience_positions: z.array(
            z.object({
              created_at: z.string().nullable(),
              end_date: z.string().nullable(),
              id: z.number(),
              position_id: z.number(),
              start_date: z.string().nullable(),
              updated_at: z.string(),
              work_experience_id: z.number()
            })
          )
        })
      )
    })
  )
});

const ProjectTeamEmployee = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().nullable()
});

const ProjectShortSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: ProjectStatusesSchema,
  project_type: ProjectTypesSchema,
  team: z.array(ProjectTeamEmployee),
  links: z.string().nullable(),
  customer_name: z.string().nullable(),
  contractor_name: z.string().nullable()
});

export type ShortProject = z.infer<typeof ProjectShortSchema>;

export const ProjectsResponseSchema = z.object({
  items: ProjectShortSchema.array(),
  page: z.object({
    limit: z.number(),
    offset: z.number(),
    total_count: z.number()
  })
});

export type ProjectListResponse = z.infer<typeof ProjectsResponseSchema>;
