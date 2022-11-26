import { type Translation } from '~/store/api/api.types';
import { type Employee } from '~/store/api/employees/employees.types';

export interface Project {
  id: number;
  name_translations: Translation;
  team: Pick<
    Employee,
    'id' | 'first_name_translations' | 'last_name_translations'
  >[];
}
