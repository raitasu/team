import { z } from 'zod';

export type EmployeeContactsInfoFormValues = z.infer<
  typeof EmployeeContactsInfoSchema
>;
export type ChangedContactsInfoValues = {
  [DataKey in keyof EmployeeContactsInfoFormValues]?: EmployeeContactsInfoFormValues[DataKey];
};
export const EmployeeContactsInfoSchema = z.object({
  primaryPhone: z.string().min(1, 'required_field'),
  emergencyContact: z.string(),
  email: z.string().email('invalid_email'),
  country: z.string(),
  city: z.string(),
  timeZone: z.string(),
  street: z.string(),
  ZIPCode: z.string(),
  building: z.string(),
  unit: z.string(),
  apartment: z.string()
});
