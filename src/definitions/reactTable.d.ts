import {
  type Employee,
  type ShortEmployee
} from '~/store/api/employees/employees.types';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- refer https://tanstack.com/table/v8/docs/api/core/table#meta
  interface TableMeta<TData extends ShortEmployee> {
    onAddCVBtnClick?: (id: number) => void;
    onDeleteCV?: (id: number) => void;
    onDeleteManager?: (id: number) => void;
    onEditMemberTeam?: (id: number) => void;
    onDeleteMemberTeam?: (id: number[]) => void;

    employee?: Employee;
  }
}
