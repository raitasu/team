import { z } from 'zod';

import { HardSkillSchema } from '~/store/api/employees/employees.schemas';

export type EmployeeHardSkillsFormValues = z.infer<typeof HardSkillsInfoSchema>;

export const HardSkillsInfoSchema = z.object({
  skills: HardSkillSchema.array()
});
