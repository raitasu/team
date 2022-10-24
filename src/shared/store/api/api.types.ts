export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface Project {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  city: string;
  job_title: string;
  date_of_birth: string;
  status: string;
  role: string;
  avatar: {
    url: string | null;
    thumb: string | null;
    smallThumb: string | null;
  };
  about: string | null;
  email: string;
  years_of_experience: number;
  projects: Project[];
}
