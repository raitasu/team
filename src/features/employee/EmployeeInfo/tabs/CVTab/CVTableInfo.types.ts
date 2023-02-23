import { type GetCVListResponse } from '~/store/api/CV/cv.types';
import { type Employee } from '~/store/api/employees/employees.types';

import { type CVsHeadersIds } from './CVTableInfo.constants';

export type CVsTable = React.FC<{
  data: Array<GetCVListResponse>;
  employee: Employee;
}>;

export type HeaderKeys = (typeof CVsHeadersIds)[keyof typeof CVsHeadersIds];
