import { z } from 'zod';

import { TranslationSchema } from '~/store/api/api.types';

export const SocialNetworkSchema = z.object({
  linkedin: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  telegram: z.string().url().optional().nullable(),
  facebook: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  vk: z.string().url().optional().nullable(),
  discord: z.string().url().optional().nullable()
});

export const AddressSchema = z.object({
  apartment: z.string(),
  building: z.string(),
  city: TranslationSchema,
  /**
   * ISO country code: https://www.iban.com/country-codes
   */
  country_code: z.string(),
  street_translations: TranslationSchema,
  unit: z.string(),
  zip_code: z.string()
});

export const EmployeeRoleSchema = z.union([
  z.literal('admin'),
  z.literal('user')
]);

export const EmployeeStatusSchema = z.union([
  z.literal('active'),
  z.literal('candidate'),
  z.literal('inactive')
]);

export const EmployeePositionSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

const EmployeeProjectSchema = z.object({
  id: z.number(),
  name_translations: TranslationSchema
});

export const ShortEmployeeSchema = z.object({
  avatar_url: z.string().url().nullable(),
  date_of_birth: z.string(),
  first_name_translations: TranslationSchema,
  id: z.number(),
  last_name_translations: TranslationSchema,
  positions: EmployeePositionSchema.array(),
  projects: EmployeeProjectSchema.array(),
  role: EmployeeRoleSchema,
  social_networks: SocialNetworkSchema,
  status: EmployeeStatusSchema,
  contacts: z.object({
    address: AddressSchema.pick({
      city: true,
      country_code: true
    }),
    emails: z.string().email().array(),
    primary_phone: z.string()
  })
});
