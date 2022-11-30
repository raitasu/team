import { z } from 'zod';

import { createUnionSchema } from '~/shared/helpers.zod';
import { TranslationSchema } from '~/store/api/api.types';

export const AddressSchema = z.object({
  apartment: z.string(),
  building: z.string(),
  city: TranslationSchema,
  country_code: z.string(),
  street_translations: TranslationSchema,
  unit: z.string(),
  zip_code: z.string()
});

const ClothingSizeSchema = z.union([
  z.literal('xs'),
  z.literal('s'),
  z.literal('m'),
  z.literal('l'),
  z.literal('xl'),
  z.literal('xxl'),
  z.literal('3xl'),
  z.literal('4xl')
]);

const GenderSchema = z.union([
  z.literal('male'),
  z.literal('female'),
  z.literal('other')
]);

export const HardSkillSchema = z.object({
  id: z.number(),
  years_of_experience: z.number(),
  name_translations: TranslationSchema
});

const LanguageLevelSchema = z.union([
  z.literal('advanced'),
  z.literal('beginner'),
  z.literal('elementary'),
  z.literal('intermediate'),
  z.literal('proficiency'),
  z.literal('upper_intermediate')
]);

export const LanguageNameSchema = z.union([
  z.literal('be'),
  z.literal('de'),
  z.literal('en'),
  z.literal('es'),
  z.literal('fr'),
  z.literal('hi'),
  z.literal('it'),
  z.literal('ja'),
  z.literal('lt'),
  z.literal('pl'),
  z.literal('pt'),
  z.literal('ru'),
  z.literal('ua'),
  z.literal('zh')
]);

export const SocialNetworkSchema = z.object({
  linkedin: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  telegram: z.string().url().optional().nullable(),
  facebook: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  vk: z.string().url().optional().nullable(),
  discord: z.string().url().optional().nullable()
});

export const SoftSkillSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

export const EmployeeCertificateSchema = AddressSchema.pick({
  country_code: true,
  city: true
}).extend({
  id: z.number(),
  institute_translations: TranslationSchema,
  file: z.string(),
  start_at: z.string(),
  end_at: z.string(),
  speciality_translations: TranslationSchema
});

export const EmployeeContactsSchema = z.object({
  primary_phone: z.string(),
  phones: z.string().array(),
  emergency_phones: z.string().array(),
  emails: z.string().email().array(),
  address: AddressSchema
});

export const EmployeeEducationSchema = AddressSchema.pick({
  country_code: true,
  city: true
}).extend({
  id: z.number(),
  degree: TranslationSchema,
  start_at: z.string(),
  end_at: z.string(),
  speciality_translations: TranslationSchema,
  university_name_translations: TranslationSchema
});

export const EmployeeLanguageSchema = z.object({
  id: z.number(),
  name: LanguageNameSchema,
  level: LanguageLevelSchema
});

export const EmployeePositionSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

const EmployeeProjectSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

export const EmployeePublicationSchema = z.object({
  id: z.number(),
  date: z.string(),
  description_translations: TranslationSchema,
  file: z.string(),
  name_translations: TranslationSchema,
  link: z.string()
});

const EmployeeRoles = ['admin', 'user'] as const;

export const EmployeeRoleSchema = createUnionSchema(EmployeeRoles);

export const EmployeeStatuses = ['active', 'candidate', 'inactive'] as const;
export const EmployeeStatusSchema = createUnionSchema(EmployeeStatuses);
export const EmployeeLanguages = [
  'be',
  'de',
  'en',
  'es',
  'fr',
  'hi',
  'it',
  'ja',
  'lt',
  'pl',
  'pt',
  'ru',
  'ua',
  'zh'
] as const;
export const EmployeeLanguagesSchema = createUnionSchema(EmployeeLanguages);

export const EmployeeLanguageLevel = [
  'advanced',
  'beginner',
  'elementary',
  'intermediate',
  'proficiency',
  'upper_intermediate'
] as const;
export const EmployeeLanguageLevelSchema = createUnionSchema(
  EmployeeLanguageLevel
);

export const CvSchema = z.object({
  id: z.number(),
  position: EmployeePositionSchema
});

export const WorkExperienceSchema = z.object({
  id: z.number(),
  company_name: z.string(),
  position: TranslationSchema,
  started_at: z.string(),
  ended_at: z.string(),
  description: TranslationSchema,
  responsibilities: TranslationSchema,
  environment: z.string().array()
});

export const EmployeeSchema = z.object({
  about_translations: TranslationSchema,
  avatar_url: z.string().url().nullable(),
  certificates: EmployeeCertificateSchema.array(),
  clothing_size: ClothingSizeSchema,
  contacts: EmployeeContactsSchema,
  cvs: CvSchema.array(),
  date_of_birth: z.string(),
  educations: EmployeeEducationSchema.array(),
  first_name_translations: TranslationSchema,
  gender: GenderSchema,
  hard_skills: HardSkillSchema.array(),
  id: z.number(),
  interests_translations: TranslationSchema,
  languages: EmployeeLanguageSchema.array(),
  last_name_translations: TranslationSchema,
  positions: EmployeePositionSchema.array(),
  projects: EmployeeProjectSchema.array(),
  publications: EmployeePublicationSchema.array(),
  role: EmployeeRoleSchema,
  social_networks: SocialNetworkSchema,
  soft_skills: SoftSkillSchema.array(),
  status: EmployeeStatusSchema,
  start_career_at: z.string(),
  timezone: z.string(),
  years_of_experience: z.number(),
  work_experiences: WorkExperienceSchema.array()
});

export const ShortEmployeeSchema = EmployeeSchema.pick({
  avatar_url: true,
  date_of_birth: true,
  first_name_translations: true,
  id: true,
  last_name_translations: true,
  positions: true,
  projects: true,
  role: true,
  social_networks: true,
  status: true
}).extend({
  contacts: EmployeeContactsSchema.pick({
    emails: true,
    primary_phone: true
  }).extend({
    address: AddressSchema.pick({
      city: true,
      country_code: true
    })
  })
});
