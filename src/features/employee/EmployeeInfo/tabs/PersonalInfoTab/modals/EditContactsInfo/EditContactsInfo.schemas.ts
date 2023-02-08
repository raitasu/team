import { z } from 'zod';

import { isEmail } from '~/features/employee/employee.utils';

export type EmployeeContactsInfoFormValues = z.infer<
  typeof EmployeeContactsInfoSchema
>;
export type ChangedContactsInfoValues = {
  [DataKey in keyof EmployeeContactsInfoFormValues]?: EmployeeContactsInfoFormValues[DataKey];
};

const EmployeeEmergencyContact = z.object({
  id: z.number(),
  name: z.string().min(1, 'required_field'),
  number: z.string().min(1, 'required_field'),
  owner: z.string().min(1, 'required_field')
});

export const EmployeeContactsInfoSchema = z.object({
  primary_phone: z.string().min(1, 'required_field'),
  secondary_phone: z.string(),
  emergency_contact_attributes: EmployeeEmergencyContact,
  employee_attributes: z.object({
    email: z.string().transform((val, ctx) => {
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
  personal_email: z.string().nullable(),
  country_code: z.string(),
  city: z.string(),
  timezone: z.string().nullable(),
  street: z.string(),
  zip_code: z.number(),
  building: z.number(),
  unit: z.string(),
  apartment: z.number()
});
