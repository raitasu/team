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
      level: string;
    }>;
    hard_skills?: Array<{
      name: string;
      duration: string;
    }>;
    soft_skills?: Array<{
      name: string;
    }>;
    work_experience?: Array<{
      project_name: string;
      company_name: string;
      description: string;
      responsibilities: string;
      environment: Array<string>;
    }>;
    education?: Array<{
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
      file: string | null;
    }>;
    publications?: Array<{
      name: string;
      url: string;
      start_date: string;
      description: string;
      file: string | null;
    }>;
  };
}
