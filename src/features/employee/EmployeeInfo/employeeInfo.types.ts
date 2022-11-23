import type React from 'react';

import { type Employee } from '~/shared/store/api/employees/employees.types';

export type EmployeeInfoTab = React.FC<{ employee: Employee }>;
