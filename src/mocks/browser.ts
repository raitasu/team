import { setupWorker } from 'msw';

import { employeesHandlers } from '~/mocks/employees/employees.handler';
import {
  getEmployees,
  updateEmployee
} from '~/mocks/employees/fixtures/employees';
import { hardSkillsHandlers } from '~/mocks/hardSkills/hardSkills.handler';
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
            first_name: employee.first_name,
            last_name: employee.last_name
          }
        ]
      });
    });

    updateEmployee(employee.id, {
      projects: employeeProjects.map((project) => ({
        id: project.id,
        name: project.name
      }))
    });
  });
})();

export const worker = setupWorker(
  healthHandler,
  ...employeesHandlers,
  ...projectHandlers,
  ...positionsHandlers,
  ...hardSkillsHandlers
);
