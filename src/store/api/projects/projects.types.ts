import { z } from 'zod';

import { DomainsSchema } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import {
  CategoriesHardSkillSchema,
  ProjectStatusesSchema,
  ProjectTypesSchema
} from '~/store/api/employees/employees.schemas';

import { ManagersSchema, MemberTeamSchema } from './projects.schemas';

export type ProjectResponse = z.infer<typeof ProjectResponseSchema>;

export const ProjectResponseSchema = z.object({
  avatar: z.string().nullable().optional(),
  business_domain: DomainsSchema.nullable(),
  challenge: z.string().nullable(),
  contractor: z.object({
    id: z.number(),
    name: z.string().nullable()
  }),
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
  managers: ManagersSchema.array(),
  name: z.string().nullable(),
  project_type: ProjectTypesSchema,
  solution: z.string().nullable(),
  started_at: z.string().nullable(),
  status: ProjectStatusesSchema,
  team: MemberTeamSchema.array()
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
  customer_name: z.string().nullable()
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
export type ProjectTeam = z.infer<typeof MemberTeamSchema>;
