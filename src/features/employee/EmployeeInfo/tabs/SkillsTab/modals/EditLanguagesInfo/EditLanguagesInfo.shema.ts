import { z } from 'zod';

import {
  EmployeeLanguageSchema,
  LanguageLevelSchema,
  LanguageNameSchema
} from '~/store/api/employees/employees.schemas';

const EmployeesEditLanguageSchema = z.object({
  id: z.number().optional(),
  name: LanguageNameSchema.nullable(),
  level: LanguageLevelSchema.nullable()
});

export type EmployeesEditLanguageValue = z.infer<
  typeof EmployeesEditLanguageSchema
>;

const EditLanguageSchema = z.object({
  languages: EmployeesEditLanguageSchema.array()
});

export const EmployeeLanguageValidationSchema = z.object({
  languages: EmployeeLanguageSchema.array()
});

export type LanguagesInfoFormValues = z.infer<typeof EditLanguageSchema>;

export type ChangedEmployeeLanguageInfoValues = {
  [DataKey in keyof LanguagesInfoFormValues]?: LanguagesInfoFormValues[DataKey];
};
