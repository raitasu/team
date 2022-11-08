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
  phones: string[];
  emergency_phones: string[];
  emails: string[];
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
  city: string;
  /**
   * ISO country code: https://www.iban.com/country-codes
   */
  country: string;
  street: string;
  zip_code: string;
}

export interface EmployeeHardSkill {
  experience: number;
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

export type EmployeeStatus = 'active' | 'candidate' | 'inactive';

type EmployeeRole = 'admin' | 'user';

export interface Employee {
  address: EmployeeAddress;
  avatar: string | null;
  clothing_size: EmployeeClothingSize;
  contacts: EmployeeContact;
  date_of_birth: string;
  first_name: Translation;
  gender: EmployeeGender;
  hard_skills: EmployeeHardSkill[];
  id: number;
  languages: EmployeeLanguage[];
  last_name: Translation;
  positions: EmployeePosition[];
  projects: Pick<Project, 'id' | 'name_translations'>[];
  years_of_experience: number;
  role: EmployeeRole;
  social_networks: EmployeeSocialNetwork;
  soft_skills: EmployeeSoftSkill[];
  status: EmployeeStatus;
}

export type ShortEmployee = Pick<
  Employee,
  | 'avatar'
  | 'date_of_birth'
  | 'first_name'
  | 'id'
  | 'last_name'
  | 'positions'
  | 'projects'
  | 'status'
> & {
  address: Pick<EmployeeAddress, 'city' | 'country'>;
};

export type EmployeesListResponse = PaginatedResponse<ShortEmployee>;
