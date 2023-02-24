import { z } from 'zod';

import { CategoriesHardSkillSchema } from '~/store/api/employees/employees.schemas';

export type ProjectHardSkillsSchemaFormValues = z.infer<
  typeof ProjectHardSkillsSchema
>;

export type HardSkillsCategory = z.infer<typeof HardSkillSchema>;
const HardSkillSchema = z
  .array(
    z.object({
      category: CategoriesHardSkillSchema,
      id: z.number(),
      name: z.string()
    })
  )
  .nullable();

export const ProjectHardSkillsSchema = z.object({
  overall: z.array(z.number()),
  frontend: z.array(z.number()),
  backend: z.array(z.number()),
  dba: z.array(z.number()),
  dev_ops: z.array(z.number()),
  blockchain: z.array(z.number()),
  management: z.array(z.number()),
  design: z.array(z.number())
});
