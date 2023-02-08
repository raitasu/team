import { type Employee } from '~/store/api/employees/employees.types';

export interface Project {
  id: number;
  name: string;
  team: Pick<Employee, 'id' | 'first_name' | 'last_name'>[];
}
