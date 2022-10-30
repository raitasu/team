import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { EmployeeHardSkill } from '~/shared/store/api/employees/employees.types';

const sessionHardSkills: Record<string, EmployeeHardSkill> = {};

const generateEmployeeHardSkill = (id: number): EmployeeHardSkill => ({
  id,
  name_translations: {
    en: faker.word.noun(),
    ru: fakerRu.word.noun()
  },
  experience: faker.datatype.number({
    min: 1,
    max: 20
  })
});

(function generateSessionHardSkills() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionHardSkills[index] = generateEmployeeHardSkill(index);
  });
})();

export const getRandomHardSkills = (count: number) =>
  shuffle(Object.values(sessionHardSkills)).slice(0, count);
