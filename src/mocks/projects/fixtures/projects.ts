import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import {
  ProjectStatus,
  ProjectType
} from '~/features/projects/Tables/tables.constants';
import { type ShortProject } from '~/store/api/projects/projects.types';

const sessionProjects: Record<string, ShortProject> = {};

const generateProject = (id: number): ShortProject => ({
  id,
  team: [],
  name: faker.company.name(),
  status: ProjectStatus.InProgress,
  project_type: ProjectType.Internal,
  links: '',
  customer_name: faker.company.name(),
  contractor_name: faker.company.name()
});

(function generateSessionProjects() {
  new Array(50).fill(1).forEach((_, index) => {
    sessionProjects[index] = generateProject(index);
  });
})();

export const getRandomProjects = (count: number) =>
  shuffle(Object.values(sessionProjects)).slice(0, count);

export const getProjects = () => Object.values(sessionProjects);

export const updateProject = (
  projectId: number,
  project: Partial<ShortProject>
) => {
  sessionProjects[projectId] = {
    ...sessionProjects[projectId],
    ...project
  };
};
