import { setupWorker } from 'msw';

import { employeesHandlers } from '~/mocks/employees/employees.handler';
import {
  getEmployees,
  updateEmployee
} from '~/mocks/employees/fixtures/employees';
import { healthHandler } from '~/mocks/health';
import { getRandomInteger } from '~/mocks/mocks.utils';
import { positionsHandlers } from '~/mocks/positions/positions.handler';
import {
  getRandomProjects,
  updateProject
} from '~/mocks/projects/fixtures/projects';
import { projectHandlers } from '~/mocks/projects/projects.handler';

(function assignEmployeesToProjects() {
  const employees = getEmployees();

  employees.forEach((employee) => {
    const employeeProjects = getRandomProjects(getRandomInteger(0, 3));

    employeeProjects.forEach((project) => {
      updateProject(project.id, {
        team: [
          ...project.team,
          {
            id: employee.id,
            first_name_translations: employee.first_name_translations,
            last_name_translations: employee.last_name_translations
          }
        ]
      });
    });

    updateEmployee(employee.id, {
      projects: employeeProjects.map((project) => ({
        id: project.id,
        name_translations: project.name_translations
      }))
    });
  });
})();

export const worker = setupWorker(
  healthHandler,
  ...employeesHandlers,
  ...projectHandlers,
  ...positionsHandlers
);
