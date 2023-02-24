import {
  type HardSkillsCategory,
  type ProjectHardSkillsSchemaFormValues
} from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/EditEnvironmentInfo.schema';
import { EnvironmentCategories } from '~/store/api/employees/employees.schemas';

const getInitialAccumulator = () =>
  EnvironmentCategories.reduce((acc, category) => {
    acc[category] = [];

    return acc;
  }, {} as ProjectHardSkillsSchemaFormValues);

export const getInitialState = (
  hardSkills: HardSkillsCategory
): ProjectHardSkillsSchemaFormValues =>
  (hardSkills || []).reduce((acc, hardSkill) => {
    acc[hardSkill.category].push(hardSkill.id);

    return acc;
  }, getInitialAccumulator());
