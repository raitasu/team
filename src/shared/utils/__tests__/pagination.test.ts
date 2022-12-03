import { test, expect } from 'vitest';

import { getPageOffset, getTotalPages } from '~/shared/utils/pagination.utils';

test('should calculate pagination correct offset', () => {
  expect(() => getPageOffset(0, 10)).toThrowError(/page number/);
  expect(getPageOffset(2, 10)).toEqual(10);
});

test('should calculate pagination correct total pages', () => {
  expect(getTotalPages(0, 10)).toEqual(1);
  expect(getTotalPages(11, 10)).toEqual(2);
  expect(getTotalPages(11, 20)).toEqual(1);
  expect(getTotalPages(9, 10)).toEqual(1);

  // @ts-expect-error -- testing
  expect(getTotalPages(undefined, 10)).toEqual(1);
});
