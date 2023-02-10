import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';
import upperFirst from 'lodash/upperFirst';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type HardSkill } from '~/store/api/employees/employees.types';

const sessionHardSkills: Record<string, HardSkill> = {};

const generateEmployeeHardSkill = (id: number): HardSkill => ({
  id,
  name: upperFirst(faker.word.noun()),
  category: faker.helpers.arrayElement([
    'overall',
    'frontend',
    'backend',
    'dba',
    'dev_ops',
    'blockchain',
    'management',
    'design'
  ]),
  is_show: faker.datatype.boolean()
});

(function generateSessionHardSkills() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionHardSkills[index] = generateEmployeeHardSkill(index);
  });
})();

export const getRandomHardSkills = (count: number) =>
  shuffle(Object.values(sessionHardSkills)).slice(0, count);

export const getHardSkills = () => Object.values(sessionHardSkills);
