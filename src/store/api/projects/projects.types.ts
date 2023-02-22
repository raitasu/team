import { z } from 'zod';

import { DomainsSchema } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import {
  type ProjectStatus,
  type ProjectType
} from '~/features/projects/Tables/tables.constants';
import { type PaginatedResponse } from '~/store/api/api.types';
import {
  ProjectStatusesSchema,
  ProjectTypesSchema
} from '~/store/api/employees/employees.schemas';

export interface Project {
  id: number;

  name: string;
  status: ProjectStatus;
  project_type: ProjectType;
  team: ShortEmployee[];
  links: string;
  customer_name: string;
  contractor_name: string;
}

interface ProjectsResponse {
  id: number;
  name: string;
  status: ProjectStatus;
  project_type: ProjectType;
  team: ShortEmployee[];
  links: string;
  customer_name: string;
  contractor_name: string;
}

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
        category: z.string(),
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

type ShortEmployee = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
};

export type ProjectsListResponse = PaginatedResponse<ProjectsResponse>;
