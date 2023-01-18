import {
  type ProjectStatus,
  type ProjectType
} from '~/features/projects/Tables/tables.constants';
import { type PaginatedResponse } from '~/store/api/api.types';

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

interface ProjectResponse {
  id: number;
  name: string;
  status: ProjectStatus;
  project_type: ProjectType;
  team: ShortEmployee[];
  links: string;
  customer_name: string;
  contractor_name: string;
}

type ShortEmployee = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
};

export type ProjectsListResponse = PaginatedResponse<ProjectResponse>;
