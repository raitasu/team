export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface Pagination {
  count: number;
  first_url: string;
  from: number;
  items: number;
  last: number;
  last_url: string;
  next: null;
  next_url: string;
  page: number;
  page_url: string;
  pages: number;
  prev: null;
  prev_url: string;
  scaffold_url: string;
  series: Array<string>;
  to: number;
  vars: {
    anchor: string;
    count: number;
    i18n_key: string;
    items: number;
    items_param: string;
    link_extra: string;
    max_items: number;
    metadata: Array<string>;
    outset: number;
    page: number;
    page_param: string;
    params: object;
    size: Array<number>;
  };
}

interface EmployeeAvatar {
  smallThumb: string | null;
  thumb: string | null;
  url: string | null;
}

export interface EmployeeProject {
  id: string;
  name: string;
}

export type EmployeeStatus = 'active' | 'candidate' | 'inactive';

export interface Employee {
  about: string | null;
  avatar: EmployeeAvatar;
  city: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  id: string;
  job_title: string;
  last_name: string;
  projects: EmployeeProject[];
  role: string;
  status: EmployeeStatus;
  years_of_experience: number;
}

export interface EmployeesListResponse {
  employees: Array<Employee>;
  pagy: Pagination;
}
