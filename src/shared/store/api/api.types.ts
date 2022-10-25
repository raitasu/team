export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface EmployeeAvatar {
  smallThumb: string | null;
  thumb: string | null;
  url: string | null;
}

export interface EmployeeProject {
  id: number;
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
  id: number;
  job_title: string;
  last_name: string;
  projects: EmployeeProject[];
  role: string;
  status: EmployeeStatus;
  years_of_experience: number;
}

export type EmployeesListResponse = Array<Employee>;
