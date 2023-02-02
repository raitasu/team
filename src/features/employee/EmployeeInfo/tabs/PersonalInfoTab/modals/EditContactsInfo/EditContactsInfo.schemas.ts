import { z } from 'zod';

import { isEmail } from '~/features/employee/employee.utils';

export type EmployeeContactsInfoFormValues = z.infer<
  typeof EmployeeContactsInfoSchema
>;
export type ChangedContactsInfoValues = {
  [DataKey in keyof EmployeeContactsInfoFormValues]?: EmployeeContactsInfoFormValues[DataKey];
};

const EmployeeEmergencyContact = z.object({
  name: z.string().min(1, 'required_field'),
  phone: z.string().min(1, 'required_field'),
  owner: z.string().min(1, 'required_field')
});

export const EmployeeContactsInfoSchema = z.object({
  primaryPhone: z.string().min(1, 'required_field'),
  secondaryPhone: z.string(),
  emergencyContact: EmployeeEmergencyContact,
  workEmail: z.string().transform((val, ctx) => {
    const email = val.concat('@cybergizer.com');

    if (!isEmail(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'invalid_email'
      });
    }

    return email;
  }),
  personalEmail: z.string().email('invalid_email'),
  country: z.string(),
  city: z.string(),
  timezone: z.string().nullable(),
  street: z.string(),
  zip_code: z.number(),
  building: z.string(),
  unit: z.string(),
  apartment: z.number()
});
