import { createColumnHelper } from '@tanstack/react-table';

import { AddCVCell } from '~/features/employees/Tables/cells/AddCVCell';
import { NameCell } from '~/features/employees/Tables/cells/NameCell';
import { ProjectsCell } from '~/features/employees/Tables/cells/ProjectsCell';
import { TranslatedHeader } from '~/features/employees/Tables/cells/TranslatedHeader';
import { EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import { getI18n } from '~/services/i18n';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

const columnHelper = createColumnHelper<ShortEmployee>();

export const PositionsColumns = [
  columnHelper.accessor((employee) => employee, {
    id: EmployeesHeaderIds.FullName,
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('positions', {
    id: EmployeesHeaderIds.Positions,
    cell: (info) =>
      Object.values(info.getValue())
        .map((project) =>
          getTranslation(project.name_translations, getI18n().language)
        )
        .join(', '),
    header: TranslatedHeader
  }),
  columnHelper.accessor('contacts', {
    id: EmployeesHeaderIds.Contacts,
    cell: (info) =>
      `${info.getValue().address.country_code}, ${getTranslation(
        info.getValue().address.city,
        getI18n().language
      )}`,
    header: TranslatedHeader
  }),
  columnHelper.accessor('date_of_birth', {
    id: EmployeesHeaderIds.Birthday,
    cell: (info) =>
      getFormattedDate(info.getValue(), getI18n().language, DateFormats.Long),
    header: TranslatedHeader
  }),
  columnHelper.accessor('projects', {
    id: EmployeesHeaderIds.CurrentProjects,
    cell: ProjectsCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('id', {
    id: EmployeesHeaderIds.CV,
    cell: AddCVCell,
    enableSorting: false,
    header: ''
  })
];
