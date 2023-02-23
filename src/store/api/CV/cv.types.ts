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
    id: number;
    first_name: string;
    last_name: string;
    start_career_at: string;
    avatar?: string | null;
    position?: string;
    description?: string;
    languages: CVLanguage[] | null;
    hard_skills: CVHardSkill[] | null;
    soft_skills: CVSoftSkill[] | null;
    work_experiences: CVWorkExperience[] | null;
    educations: CVEducation[] | null;
    certificates: CVCertificate[] | null;
    publications: CVPublication[] | null;
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
  environment: Array<{
    name: string;
  }>;
  position: string;
  started_at: string;
  ended_at: string;
};

type CVSoftSkill = {
  id: number;
  name: string;
};

type CVHardSkill = {
  id: number;
  category: string;
  created_at: Date;
  name: string;
  updated_at: string;
};

type CVLanguage = {
  id: number;
  name: string;
  level: LanguageLevel;
};
