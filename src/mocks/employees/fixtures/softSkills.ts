import { faker } from '@faker-js/faker/locale/en';
import upperFirst from 'lodash/upperFirst';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type SoftSkill } from '~/store/api/employees/employees.types';

const sessionSoftSkills: Record<string, SoftSkill> = {};

const generateEmployeeSoftSkill = (id: number): SoftSkill => ({
  id,
  name: upperFirst(faker.word.noun())
});

export const opinions = new Array(48).fill(1).map((_el, index) => ({
  id: index,
  name: upperFirst(faker.word.noun())
}));

(function generateSessionSoftSkills() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionSoftSkills[index] = generateEmployeeSoftSkill(index);
  });
})();
