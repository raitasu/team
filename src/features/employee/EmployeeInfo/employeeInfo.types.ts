import type React from 'react';

import { type Employee } from '~/store/api/employees/employees.types';

export type EmployeeInfoTab = React.FC<{ employee: Employee }>;
