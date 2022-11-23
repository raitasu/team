import { createColumnHelper } from '@tanstack/react-table';

import { ProjectsCell } from '~/features/employees/Table/cells/ProjectsCell';
import { getI18n } from '~/services/i18n';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';

import { AddCVCell } from './cells/AddCVCell';
import { NameCell } from './cells/NameCell';
import { TranslatedHeader } from './cells/TranslatedHeader';

const columnHelper = createColumnHelper<ShortEmployee>();

export const EmployeesColumns = [
  columnHelper.accessor(() => undefined, {
    id: 'full_name',
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('positions', {
    cell: (info) =>
      Object.values(info.getValue())
        .map((project) =>
          getTranslation(project.name_translations, getI18n().language)
        )
        .join(', '),
    header: TranslatedHeader
  }),
  columnHelper.accessor('contacts', {
    cell: (info) =>
      `${info.getValue().address.country_code}, ${getTranslation(
        info.getValue().address.city,
        getI18n().language
      )}`,
    header: TranslatedHeader
  }),
  columnHelper.accessor('date_of_birth', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('projects', {
    cell: ProjectsCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor(() => undefined, {
    id: 'cv',
    cell: AddCVCell,
    enableSorting: false,
    header: ''
  })
];
