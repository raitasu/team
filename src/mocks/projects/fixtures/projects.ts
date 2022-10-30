import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { Project } from '~/shared/store/api/projects/projects.types';

const sessionProjects: Record<string, Project> = {};

const generateProject = (id: number): Project => ({
  id,
  team: [],
  name_translations: {
    en: faker.company.name(),
    ru: fakerRu.company.name()
  }
});

(function generateSessionProjects() {
  new Array(50).fill(1).forEach((_, index) => {
    sessionProjects[index] = generateProject(index);
  });
})();

export const getRandomProjects = (count: number) =>
  shuffle(Object.values(sessionProjects)).slice(0, count);

export const getProjects = () => Object.values(sessionProjects);

export const updateProject = (projectId: number, project: Partial<Project>) => {
  sessionProjects[projectId] = {
    ...sessionProjects[projectId],
    ...project
  };
};
