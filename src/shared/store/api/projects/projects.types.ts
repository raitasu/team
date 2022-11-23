import { type Translation } from '~/shared/store/api/api.types';
import { type Employee } from '~/shared/store/api/employees/employees.types';

export interface Project {
  id: number;
  name_translations: Translation;
  team: Pick<Employee, 'id' | 'first_name' | 'last_name'>[];
}
