import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { EmployeeSoftSkill } from '~/shared/store/api/employees/employees.types';

const sessionSoftSkills: Record<string, EmployeeSoftSkill> = {};

const generateEmployeeSoftSkill = (id: number): EmployeeSoftSkill => ({
  id,
  name_translations: {
    en: faker.word.noun(),
    ru: fakerRu.word.noun()
  }
});

(function generateSessionSoftSkills() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionSoftSkills[index] = generateEmployeeSoftSkill(index);
  });
})();

export const getRandomSoftSkills = (count: number) =>
  shuffle(Object.values(sessionSoftSkills)).slice(0, count);
