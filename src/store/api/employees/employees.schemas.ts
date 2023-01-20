import { z } from 'zod';

import { createUnionSchema } from '~/shared/helpers.zod';
import { TranslationSchema } from '~/store/api/api.types';

import { Patterns } from '../api.constants';

export const EmployeeCountries = ['ru', 'be'] as const;

export const EmployeeCountriesSchema = createUnionSchema(EmployeeCountries);

export const AddressSchema = z.object({
  apartment: z.string(),
  building: z.string(),
  city: TranslationSchema.nullable(),
  country_code: EmployeeCountriesSchema,
  street_translations: TranslationSchema,
  unit: z.string(),
  zip_code: z.string()
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
  z.literal('overal'),
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
  years_of_experience: z.number(),
  name_translations: TranslationSchema,
  category: CategoriesHardSkillSchema,
  is_show: z.boolean()
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
  name_translations: TranslationSchema
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
  institute_translations: TranslationSchema,
  file: z.string(),
  start_at: z.string().datetime(),
  end_at: z.string().datetime(),
  speciality_translations: TranslationSchema
});

export const EmployeeContactsSchema = z.object({
  primary_phone: z.string().nullable(),
  phones: z.string().array().nullable(),
  emergency_phones: z.string().array().nullable(),
  emails: z.string().email().array(),
  address: AddressSchema.nullable()
});

export const EmployeeEducationSchema = AddressSchema.pick({
  country_code: true,
  city: true
}).extend({
  id: z.number(),
  degree: TranslationSchema,
  start_at: z.string().datetime(),
  end_at: z.string().datetime(),
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

export const EmployeeProjectSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

export const EmployeePublicationSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
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
  started_at: z.string().datetime(),
  ended_at: z.string().datetime(),
  description: TranslationSchema,
  responsibilities: TranslationSchema,
  environment: z.string().array()
});

export const EmployeeSchema = z.object({
  about_translations: TranslationSchema.nullable(),
  avatar_url: z.string().url().nullable(),
  certificates: EmployeeCertificateSchema.array().nullable(),
  clothing_size: EmployeeClothingSizesSchema.nullable(),
  contacts: EmployeeContactsSchema,
  cvs: CvSchema.array().nullable(),
  date_of_birth: z.string().datetime().nullable(),
  educations: EmployeeEducationSchema.array().nullable(),
  first_name_translations: TranslationSchema,
  gender: EmployeeGendersSchema.nullable(),
  hard_skills: HardSkillSchema.array().nullable(),
  id: z.number(),
  email: z.string(),
  interests_translations: TranslationSchema.nullable(),
  languages: EmployeeLanguageSchema.array().nullable(),
  last_name_translations: TranslationSchema,
  positions: EmployeePositionSchema.array().nullable(),
  projects: EmployeeProjectSchema.array().nullable(),
  publications: EmployeePublicationSchema.array().nullable(),
  role: EmployeeRoleSchema.nullable(),
  social_networks: SocialNetworkSchema.nullable(),
  soft_skills: SoftSkillSchema.array().nullable(),
  status: EmployeeStatusSchema,
  start_career_at: z.string().datetime().nullable(),
  timezone: z.string().nullable(),
  years_of_experience: z.number().nullable(),
  work_experiences: WorkExperienceSchema.array().nullable()
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
  status: true,
  email: true
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
