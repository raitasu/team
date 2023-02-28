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
    id: number;
    name: string;
    projects_count: string;
    years_of_experience: string;
    avatar?: string | null;
    position?: string;
    description?: string;
    languages: CVLanguage[];
    hard_skills: CVHardSkill[];
    soft_skills: CVSoftSkill[];
    work_experiences: CVWorkExperience[];
    educations: CVEducation[];
    certificates: CVCertificate[];
    publications: CVPublication[];
  };
}

type CVPublication = {
  id: number;
  name: string;
  url: string;
  start_date: string;
  description: string;
  file: File | null;
};

type CVCertificate = {
  id: number;
  name: string;
  issued_by: string;
  start_date: string;
  link: string;
  end_date: string;
  file: File | null;
};

type CVEducation = {
  id: number;
  university_name: string;
  speciality: string;
  started_at: string;
  graduated_at: string | null;
  country: string;
  degree: string;
};

type CVWorkExperience = {
  id: number;
  project_name: string;
  company_name: string;
  description: string;
  responsibilities: string;
  environment: string;
  position: string;
  started_at: string;
  ended_at: string;
};

type CVSoftSkill = {
  id: number;
  name: string;
};

type CVHardSkill = {
  name: string;
  years_of_experience: string;
};

type CVLanguage = {
  id: number;
  name: string;
};
