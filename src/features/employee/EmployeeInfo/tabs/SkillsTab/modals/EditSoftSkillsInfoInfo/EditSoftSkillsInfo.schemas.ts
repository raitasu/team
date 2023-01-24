import { z } from 'zod';

import { SelectedSoftSkillSchema } from '~/store/api/employees/employees.schemas';

export type EmployeeSoftSkillsFormValues = z.infer<typeof SoftSkillsInfoSchema>;

export const SoftSkillsInfoSchema = z.object({
  skills: SelectedSoftSkillSchema.array()
});
