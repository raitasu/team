import { setupWorker } from 'msw';

import { employeesHandler } from '~/mocks/employees';
import { healthHandler } from '~/mocks/health';

export const worker = setupWorker(healthHandler, employeesHandler);
