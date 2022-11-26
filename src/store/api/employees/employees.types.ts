import { type z } from 'zod';

import type en from '~/services/i18n/locales/en.json';
import {
  type PaginatedResponse,
  type Translation
} from '~/store/api/api.types';
import {
  type AddressSchema,
  type EmployeePositionSchema,
  type EmployeeRoleSchema,
  type EmployeeStatusSchema,
  type ShortEmployeeSchema,
  type SocialNetworkSchema
} from '~/store/api/employees/employees.schemas';
import { type Project } from '~/store/api/projects/projects.types';

export type EmployeeLanguageName = keyof typeof en['enums']['language'];

/**
 * Possession level
 */
type EmployeeLanguageSkill = keyof typeof en['enums']['language_level'];

/**
 * Map of contacts
 *
 * @property {string} name ISO language code
 * @property {EmployeeLanguageSkill} level
 */
export type EmployeeLanguage = {
  id: number;
  name: EmployeeLanguageName;
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
  address: z.infer<typeof AddressSchema>;
}

export interface EmployeeCv {
  id: number;
  position: EmployeePosition;
}

/**
 * Map of social network URLs
 */
export type EmployeeSocialNetwork = z.infer<typeof SocialNetworkSchema>;

export type EmployeeAddress = z.infer<typeof AddressSchema>;

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

export type EmployeePosition = z.infer<typeof EmployeePositionSchema>;

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

type EmployeeRole = z.infer<typeof EmployeeRoleSchema>;

export type EmployeeStatus = z.infer<typeof EmployeeStatusSchema>;

export interface EmployeeCertificate
  extends Pick<EmployeeAddress, 'country_code' | 'city'> {
  id: number;
  institute_translations: Translation;
  file: string;
  start_at: string;
  end_at: string;
  speciality_translations: Translation;
}

export interface EmployeeWorkExperience {
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
  first_name_translations: Translation;
  gender: EmployeeGender;
  hard_skills: EmployeeHardSkill[];
  id: number;
  interests_translations: Translation;
  languages: EmployeeLanguage[];
  last_name_translations: Translation;
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
  work_experiences: EmployeeWorkExperience[];
}

export type ShortEmployee = z.infer<typeof ShortEmployeeSchema>;

export type EmployeesListResponse = PaginatedResponse<ShortEmployee>;
