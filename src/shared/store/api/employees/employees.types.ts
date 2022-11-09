import type {
  PaginatedResponse,
  Translation
} from '~/shared/store/api/api.types';
import type { Project } from '~/shared/store/api/projects/projects.types';

/**
 * Possession level
 */
type EmployeeLanguageSkill =
  | 'beginner'
  | 'elementary'
  | 'intermediate'
  | 'upper_intermediate'
  | 'advanced'
  | 'proficiency';

/**
 * Map of contacts
 *
 * @property {string} name ISO language code
 * @property {EmployeeLanguageSkill} level
 */
export type EmployeeLanguage = {
  id: number;
  name: string;
  level: EmployeeLanguageSkill;
};

/**
 * Map of contacts
 *
 * @property {string[]} phones List of phone numbers (+375291111111)
 * @property {string[]} emergency_phones List of phone numbers (+375291111111)
 * @property {string[]} emails List of emails
 */
export interface EmployeeContact {
  primary_phone: string;
  phones: string[];
  emergency_phones: string[];
  emails: string[];
  address: EmployeeAddress;
}

export interface EmployeeCv {
  id: number;
  position: EmployeePosition;
}

/**
 * Map of social network URLs
 */
export interface EmployeeSocialNetwork {
  linkedin: string;
  github: string;
  telegram: string;
  facebook: string;
  instagram: string;
  vk: string;
  discord: string;
}

export interface EmployeeAddress {
  apartment: string;
  building: string;
  city: Translation;
  /**
   * ISO country code: https://www.iban.com/country-codes
   */
  country_code: string;
  street_translations: Translation;
  unit: string;
  zip_code: string;
}

export interface EmployeeEducation
  extends Pick<EmployeeAddress, 'country_code' | 'city'> {
  id: number;
  degree: Translation;
  start_at: string;
  end_at: string;
  speciality_translations: Translation;
  university_name_translations: Translation;
}

export interface EmployeeHardSkill {
  years_of_experience: number;
  id: number;
  name_translations: Translation;
}

export interface EmployeePosition {
  id: number;
  name_translations: Translation;
}

export interface EmployeeSoftSkill {
  id: number;
  name_translations: Translation;
}

type EmployeeClothingSize =
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | '3xl'
  | '4xl';

type EmployeeGender = 'male' | 'female' | 'other';

export interface EmployeePublication {
  id: number;
  date: string;
  description_translations: Translation;
  file: string;
  name_translations: Translation;
  link: string;
}

type EmployeeRole = 'admin' | 'user';

export type EmployeeStatus = 'active' | 'candidate' | 'inactive';

export interface EmployeeCertificate
  extends Pick<EmployeeAddress, 'country_code' | 'city'> {
  id: number;
  institute_translations: Translation;
  file: string;
  start_at: string;
  end_at: string;
  speciality_translations: Translation;
}

export interface EmployeeWorkExperince {
  id: number;
  company_name: string;
  position: Translation;
  started_at: string;
  ended_at: string;
  description: Translation;
  responsibilities: Translation;
  environment: string[];
}

export interface Employee {
  about_translations: Translation;
  avatar_url: string | null;
  certificates: EmployeeCertificate[];
  clothing_size: EmployeeClothingSize;
  contacts: EmployeeContact;
  cvs: EmployeeCv[];
  date_of_birth: string;
  educations: EmployeeEducation[];
  first_name: Translation;
  gender: EmployeeGender;
  hard_skills: EmployeeHardSkill[];
  id: number;
  interests_translations: Translation;
  languages: EmployeeLanguage[];
  last_name: Translation;
  positions: EmployeePosition[];
  projects: Pick<Project, 'id' | 'name_translations'>[];
  publications: EmployeePublication[];
  role: EmployeeRole;
  social_networks: EmployeeSocialNetwork;
  soft_skills: EmployeeSoftSkill[];
  status: EmployeeStatus;
  start_career_at: string;
  timezone: string;
  years_of_experience: number;
  work_experiences: EmployeeWorkExperince[];
}

export type ShortEmployee = Pick<
  Employee,
  | 'avatar_url'
  | 'date_of_birth'
  | 'first_name'
  | 'id'
  | 'last_name'
  | 'positions'
  | 'projects'
  | 'role'
  | 'status'
> & {
  contacts: {
    address: Pick<EmployeeAddress, 'city' | 'country_code'>;
  };
};

export type EmployeesListResponse = PaginatedResponse<ShortEmployee>;
