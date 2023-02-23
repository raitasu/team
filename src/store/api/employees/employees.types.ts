import { type z } from 'zod';

import { type PaginatedResponse } from '~/store/api/api.types';
import {
  type AddressSchema,
  type CvSchema,
  type EmployeeCertificateSchema,
  type EmployeeContactsSchema,
  type EmployeeEducationSchema,
  type EmployeeLanguageSchema,
  type EmployeePositionSchema,
  type EmployeeProjectSchema,
  type EmployeePublicationSchema,
  type EmployeeRoleSchema,
  type EmployeeSchema,
  type EmployeeStatusSchema,
  type HardSkillSchema,
  type ShortEmployeeSchema,
  type SocialNetworkSchema,
  type SoftSkillSchema,
  type WorkExperienceSchema,
  type EmployeeLanguageLevelSchema,
  type EmployeeLanguagesSchema,
  type CategoriesHardSkillSchema,
  type EmployeeContactInfoSchema,
  type SelectedSoftSkillSchema,
  type CustomersSchema,
  type ProjectStatusesSchema
} from '~/store/api/employees/employees.schemas';

export type Address = z.infer<typeof AddressSchema>;

export type EmployeeContact = z.infer<typeof EmployeeContactsSchema>;

export type EmployeeContactInfo = z.infer<typeof EmployeeContactInfoSchema>;

export type EmployeeRole = z.infer<typeof EmployeeRoleSchema>;

export type EmployeeCv = z.infer<typeof CvSchema>;

export type EmployeeEducation = z.infer<typeof EmployeeEducationSchema>;

export type HardSkill = z.infer<typeof HardSkillSchema>;

export type CategoriesHardSkill = z.infer<typeof CategoriesHardSkillSchema>;

export type EmployeeLanguage = z.infer<typeof EmployeeLanguageSchema>;

export type LanguageName = z.infer<typeof EmployeeLanguagesSchema>;

export type LanguageLevel = z.infer<typeof EmployeeLanguageLevelSchema>;

export type EmployeePosition = z.infer<typeof EmployeePositionSchema>;

export type SocialNetwork = z.infer<typeof SocialNetworkSchema>;

export type SoftSkill = z.infer<typeof SoftSkillSchema>;

export type SelectedSoftSkill = z.infer<typeof SelectedSoftSkillSchema>;

export type EmployeeProject = z.infer<typeof EmployeeProjectSchema>;

export type ProjectStatuses = z.infer<typeof ProjectStatusesSchema>;

export type EmployeePublication = z.infer<typeof EmployeePublicationSchema>;

export type EmployeeStatus = z.infer<typeof EmployeeStatusSchema>;

export type EmployeeCertificate = z.infer<typeof EmployeeCertificateSchema>;

export type EmployeeWorkExperience = z.infer<typeof WorkExperienceSchema>;

export type CreateEmployeeWorkExperience = {
  company_name: string;
  description: string;
  hard_skill_ids: number[];
  position_ids: number[];
  project_name: string;
  responsibilities: string;
  ended_at: string | null;
  started_at: string;
};

export type Employee = z.infer<typeof EmployeeSchema>;

export type Customers = z.infer<typeof CustomersSchema>;

export type ShortEmployee = z.infer<typeof ShortEmployeeSchema>;

export type EmployeesListResponse = PaginatedResponse<ShortEmployee>;
