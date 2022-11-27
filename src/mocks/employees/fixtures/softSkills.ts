import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';
import upperFirst from 'lodash/upperFirst';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type SoftSkill } from '~/store/api/employees/employees.types';

const sessionSoftSkills: Record<string, SoftSkill> = {};

const generateEmployeeSoftSkill = (id: number): SoftSkill => ({
  id,
  name_translations: {
    en: upperFirst(faker.word.noun()),
    ru: upperFirst(fakerRu.word.noun())
  }
});

(function generateSessionSoftSkills() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionSoftSkills[index] = generateEmployeeSoftSkill(index);
  });
})();

export const getRandomSoftSkills = (count: number) =>
  shuffle(Object.values(sessionSoftSkills)).slice(0, count);
