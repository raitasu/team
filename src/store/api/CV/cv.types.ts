import { type LanguageLevel } from '~/store/api/employees/employees.types';

export interface GetCVListResponse {
  created_at: string;
  id: number;
  name: string;
  positions: string | null;
  link: string;
}

export interface GetCVResponse {
  name: string;
  id: number;
  link: string;
  profile: {
    first_name: string;
    last_name: string;
    start_career_at: string;
    avatar?: string | null;
    position?: string;
    description?: string;
    languages?: Array<{
      name: string;
      level: LanguageLevel;
    }>;
    hard_skills?: Array<{
      category: string;
      created_at: Date;
      id: number;
      name: string;
      updated_at: string;
    }>;
    soft_skills?: Array<{
      name: string;
    }>;
    work_experiences?: Array<{
      project_name: string;
      company_name: string;
      description: string;
      responsibilities: string;
      environment: Array<{
        name: string;
      }>;
      position: string;
      started_at: string;
      ended_at: string;
    }>;
    educations?: Array<{
      university_name: string;
      speciality: string;
      started_at: string;
      graduated_at: string | null;
      country: string;
      degree: string;
    }>;
    certificates?: Array<{
      name: string;
      issued_by: string;
      start_date: string;
      link: string;
      end_date: string;
      file: File | null;
    }>;
    publications?: Array<{
      name: string;
      url: string;
      start_date: string;
      description: string;
      file: File | null;
    }>;
  };
}
