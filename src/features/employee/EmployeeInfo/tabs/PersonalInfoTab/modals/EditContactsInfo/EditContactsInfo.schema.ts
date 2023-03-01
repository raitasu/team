import { z } from 'zod';

import { isEmail } from '~/features/employee/employee.utils';

import { checkNumber, checkPhoneNumber } from './EditContactsInfo.utils';

export type EmployeeContactsInfoFormValues = z.infer<
  typeof EmployeeContactsInfoSchema
>;

export type ChangedContactsInfoValues = {
  [DataKey in keyof EmployeeContactsInfoFormValues]?: EmployeeContactsInfoFormValues[DataKey];
};

const EmployeeEmergencyContact = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, 'required_field'),
  number: z
    .string()
    .min(1, 'required_field')
    .refine((data) => checkPhoneNumber(data), {
      message: 'invalid_phone_number'
    }),
  owner: z.string().min(1, 'required_field')
});

export const EmployeeContactsInfoSchema = z.object({
  primary_phone: z
    .string()
    .min(1, 'required_field')
    .refine((data) => checkPhoneNumber(data), {
      message: 'invalid_phone_number'
    }),
  secondary_phone: z
    .string()
    .nullable()
    .refine((data) => checkPhoneNumber(data), {
      message: 'invalid_phone_number'
    }),
  emergency_contact_attributes: EmployeeEmergencyContact,
  employee_attributes: z.object({
    email: z.string().superRefine((val, ctx) => {
      const email = val.concat('@cybergizer.com');

      if (!isEmail(email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'invalid_email'
        });
      }

      return email;
    }),
    id: z.number()
  }),
  personal_email: z
    .string()
    .email('invalid_email')
    .optional()
    .or(z.literal('')),
  country_code: z.string(),
  city_name: z.string().nullable().optional(),
  time_zone: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  zip_code: z
    .string()
    .nullable()
    .optional()
    .refine((data) => checkNumber(data)),
  building: z
    .string()
    .nullable()
    .optional()
    .refine((data) => checkNumber(data)),
  unit: z.string().nullable().optional(),
  apartment: z
    .string()
    .nullable()
    .optional()
    .refine((data) => checkNumber(data))
});
