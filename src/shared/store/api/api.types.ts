export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface EmployeeAvatar {
  url: string | null;
  thumb: string | null;
  smallThumb: string | null;
}

export interface EmployeeProject {
  id: string;
  name: string;
}

export type EmployeeStatus = 'active' | 'candidate' | 'inactive';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  city: string;
  job_title: string;
  date_of_birth: string;
  status: EmployeeStatus;
  role: string;
  avatar: EmployeeAvatar;
  about: string | null;
  email: string;
  years_of_experience: number;
  projects: EmployeeProject[];
}
