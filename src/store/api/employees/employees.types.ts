import { type z } from 'zod';

import { type PaginatedResponse } from '~/store/api/api.types';
import {
  type AddressSchema,
  type EmployeeCertificateSchema,
  type EmployeeContactsSchema,
  type CvSchema,
  type EmployeeEducationSchema,
  type EmployeeLanguageSchema,
  type EmployeePositionSchema,
  type EmployeePublicationSchema,
  type EmployeeSchema,
  type EmployeeStatusSchema,
  type HardSkillSchema,
  type LanguageNameSchema,
  type ShortEmployeeSchema,
  type SocialNetworkSchema,
  type SoftSkillSchema,
  type WorkExperienceSchema
} from '~/store/api/employees/employees.schemas';

export type Address = z.infer<typeof AddressSchema>;

export type EmployeeContact = z.infer<typeof EmployeeContactsSchema>;

export type EmployeeCv = z.infer<typeof CvSchema>;

export type EmployeeEducation = z.infer<typeof EmployeeEducationSchema>;

export type HardSkill = z.infer<typeof HardSkillSchema>;

export type EmployeeLanguage = z.infer<typeof EmployeeLanguageSchema>;

export type LanguageName = z.infer<typeof LanguageNameSchema>;

export type EmployeePosition = z.infer<typeof EmployeePositionSchema>;

export type SocialNetwork = z.infer<typeof SocialNetworkSchema>;

export type SoftSkill = z.infer<typeof SoftSkillSchema>;

export type EmployeePublication = z.infer<typeof EmployeePublicationSchema>;

export type EmployeeStatus = z.infer<typeof EmployeeStatusSchema>;

export type EmployeeCertificate = z.infer<typeof EmployeeCertificateSchema>;

export type EmployeeWorkExperience = z.infer<typeof WorkExperienceSchema>;

export type Employee = z.infer<typeof EmployeeSchema>;

export type ShortEmployee = z.infer<typeof ShortEmployeeSchema>;

export type EmployeesListResponse = PaginatedResponse<ShortEmployee>;
