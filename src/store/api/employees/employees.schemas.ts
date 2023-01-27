import { z } from 'zod';

import { createUnionSchema } from '~/shared/helpers.zod';

import { Patterns } from '../api.constants';

export const EmployeeTimezones = [
  '(GMT+03:00 Moscow, Standard Time - Minsk',
  '(GMT+03:00 Moscow, Standard Time - Moscow'
] as const;

export const AddressSchema = z.object({
  city: z.string().nullable(),
  country_code: z.string().nullable()
});

export const EmployeeClothingSizes = [
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  '3xl',
  '4xl'
] as const;

export const EmployeeClothingSizesSchema = createUnionSchema(
  EmployeeClothingSizes
);

export const EmployeeGenders = ['male', 'female', 'other'] as const;

export const EmployeeGendersSchema = createUnionSchema(EmployeeGenders);

export const CategoriesHardSkillSchema = z.union([
  z.literal('overall'),
  z.literal('frontend'),
  z.literal('backend'),
  z.literal('dba'),
  z.literal('dev_ops'),
  z.literal('blockchain'),
  z.literal('management'),
  z.literal('design')
]);

export const HardSkillSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: CategoriesHardSkillSchema,
  is_show: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

export const EmployeeLanguages = [
  'be',
  'zh',
  'en',
  'fr',
  'de',
  'hi',
  'ja',
  'it',
  'lt',
  'pl',
  'pt',
  'ru',
  'es',
  'ua'
] as const;
export const EmployeeLanguagesSchema = createUnionSchema(EmployeeLanguages);
export const SocialNetworkSchema = z.object({
  linkedin: z
    .string()
    .regex(new RegExp(Patterns.Linkedin))
    .optional()
    .nullable(),
  github: z.string().regex(new RegExp(Patterns.GitHub)).optional().nullable(),
  discord: z.string().regex(new RegExp(Patterns.Discord)).optional().nullable(),
  telegram: z
    .string()
    .regex(new RegExp(Patterns.Telegram))
    .optional()
    .nullable(),
  facebook: z
    .string()
    .regex(new RegExp(Patterns.Facebook))
    .optional()
    .nullable(),
  instagram: z
    .string()
    .regex(new RegExp(Patterns.Instagram))
    .optional()
    .nullable(),
  vk: z.string().regex(new RegExp(Patterns.VKontakte)).optional().nullable()
});

export const SoftSkillSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const SelectedSoftSkillSchema = z.object({
  value: z.number(),
  label: z.string()
});

export const EmployeeCertificateSchema = AddressSchema.pick({
  country_code: true,
  city: true
}).extend({
  id: z.number(),
  institute: z.string(),
  file: z.string(),
  start_date: z.string().datetime(),
  speciality: z.string(),
  end_date: z.string().datetime(),
  issued_by: z.string(),
  link: z.string(),
  name: z.string()
});

const EmployeeEmergencyContact = z.object({
  id: z.number(),
  number: z.string().nullable(),
  name: z.string().nullable(),
  owner: z.string().nullable()
});

export const EmployeeContactsSchema = z.object({
  primary_phone: z.string().nullable(),
  address: AddressSchema.nullable()
});

export const EmployeeContactInfoSchema = z.object({
  id: z.number().optional(),
  employee_attributes: z
    .object({
      email: z.string().email().nullable().optional(),
      id: z.number()
    })
    .optional(),
  personal_email: z.string().email().nullable(),
  secondary_phone: z.string().nullable(),
  primary_phone: z.string().nullable().optional(),
  street: z.string().nullable(),
  country_code: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  timezone: z.string().nullable(),
  apartment: z.number().nullable(),
  building: z.number().nullable(),
  unit: z.string().nullable(),
  zip_code: z.number().nullable(),
  emergency_contact: EmployeeEmergencyContact.nullable(),
  linkedin: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  vk: z.string().nullable().optional(),
  telegram: z.string().nullable().optional(),
  discord: z.string().nullable().optional(),
  github: z.string().nullable().optional()
});
export const EmployeeEducationSchema = AddressSchema.pick({
  city: true
}).extend({
  id: z.number(),
  degree: z.string(),
  nowadays: z.boolean(),
  started_at: z.string().datetime(),
  graduated_at: z.string().datetime(),
  speciality: z.string(),
  university_name: z.string()
});

export const EmployeePositionSchema = z.object({
  created_at: z.string().datetime(),
  id: z.number(),
  name: z.string(),
  updated_at: z.string().datetime()
});

export const EmployeeProjectSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const EmployeePublicationSchema = z.object({
  id: z.number(),
  start_date: z.string().datetime({ offset: true }),
  description: z.string(),
  file: z.string().url().nullable(),
  name: z.string(),
  url: z.string().url().nullable()
});

const EmployeeRoles = ['admin', 'user'] as const;

export const EmployeeRoleSchema = createUnionSchema(EmployeeRoles);

export const EmployeeStatuses = ['active', 'candidate', 'inactive'] as const;
export const ProjectStatuses = [
  'in_progress',
  'on_hold',
  'completed',
  'wasted'
] as const;
export const ProjectTypes = ['external', 'internal'] as const;
export const EmployeeStatusSchema = createUnionSchema(EmployeeStatuses);
export const ProjectStatusesSchema = createUnionSchema(ProjectStatuses);
export const ProjectTypesSchema = createUnionSchema(ProjectTypes);

export const EmployeeLanguageLevel = [
  'elementary',
  'beginner',
  'intermediate',
  'upper_intermediate',
  'advanced',
  'proficiency'
] as const;

export const AuthSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string()
});

export const EmployeeLanguageLevelSchema = createUnionSchema(
  EmployeeLanguageLevel
);
export const EmployeeLanguageSchema = z.object({
  id: z.number().optional(),
  name: EmployeeLanguagesSchema,
  level: EmployeeLanguageLevelSchema
});
export const CvSchema = z.object({
  id: z.number(),
  position: EmployeePositionSchema
});

export const CustomersSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const WorkExperienceSchema = z.object({
  id: z.number(),
  company_name: z.string(),
  project_name: z.string(),
  positions: z
    .object({
      created_at: z.string().datetime(),
      id: z.number(),
      name: z.string(),
      updated_at: z.string().datetime()
    })
    .array(),
  started_at: z.string().datetime(),
  ended_at: z.string().datetime(),
  description: z.string(),
  responsibilities: z.string(),
  hard_skills: HardSkillSchema.array()
});

export const EmployeeSchema = z.object({
  about: z.string().nullable(),
  avatar: z.string().url().nullable(),
  certificates: EmployeeCertificateSchema.array().nullable(),
  sweat_shirt_size: EmployeeClothingSizesSchema.nullable(),
  t_shirt_size: EmployeeClothingSizesSchema.nullable(),
  contacts: EmployeeContactsSchema,
  contact_info: EmployeeContactInfoSchema,
  cvs: CvSchema.array().optional().nullable(),
  date_of_birth: z.string().datetime({ offset: true }).nullable(),
  educations: EmployeeEducationSchema.array().nullable(),
  first_name: z.string(),
  gender: EmployeeGendersSchema.nullable(),
  employee_hard_skill_permissions: HardSkillSchema.array().nullable(),
  id: z.number(),
  email: z.string().email(),
  interests: z.string().nullable(),
  languages: EmployeeLanguageSchema.array().nullable(),
  last_name: z.string(),
  positions: EmployeePositionSchema.array().optional().nullable(),
  projects: EmployeeProjectSchema.array().nullable(),
  publications: EmployeePublicationSchema.array().nullable(),
  role: EmployeeRoleSchema.nullable(),
  social_networks: SocialNetworkSchema.nullable(),
  soft_skills: SoftSkillSchema.array().nullable(),
  status: EmployeeStatusSchema,
  start_career_at: z.string().datetime().nullable(),
  hired_at: z.string().datetime().nullable(),
  years_of_experience: z.number().optional().nullable(),
  work_experiences: WorkExperienceSchema.array().nullable()
});

export const EmployeeResponseSchema = z.object({
  items: EmployeeSchema.array(),
  page: z.object({
    limit: z.number(),
    offset: z.number(),
    total_count: z.number()
  })
});

export const ShortEmployeeSchema = EmployeeSchema.pick({
  avatar: true,
  about: true,
  date_of_birth: true,
  first_name: true,
  id: true,
  last_name: true,
  positions: true,
  projects: true,
  role: true,
  social_networks: true,
  status: true,
  email: true,
  interests: true,
  start_career_at: true
}).extend({
  contacts: EmployeeContactsSchema.pick({
    primary_phone: true
  }).extend({
    address: AddressSchema.pick({
      city: true,
      country_code: true
    })
  })
});
