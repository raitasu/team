import { type Primitive, z, type ZodLiteral, type ZodNever } from 'zod';

import { type ArrayValues } from '~/shared/helpers.types';

type MappedZodLiterals<T extends readonly Primitive[]> = {
  -readonly [K in keyof T]: ZodLiteral<T[K]>;
};

function createManyUnion<
  A extends Readonly<[Primitive, Primitive, ...Primitive[]]>
>(literals: A) {
  return z.union(
    literals.map((value) => z.literal(value)) as MappedZodLiterals<A>
  );
}

export function createUnionSchema<T extends readonly []>(values: T): ZodNever;
export function createUnionSchema<T extends readonly [Primitive]>(
  values: T
): ZodLiteral<T[0]>;
export function createUnionSchema<
  T extends readonly [Primitive, Primitive, ...Primitive[]]
>(values: T): z.ZodUnion<MappedZodLiterals<T>>;
export function createUnionSchema<T extends readonly Primitive[]>(values: T) {
  if (values.length > 1) {
    return createManyUnion(
      values as typeof values & [Primitive, Primitive, ...Primitive[]]
    );
  }

  if (values.length === 1) {
    return z.literal(values[0]);
  }

  if (values.length === 0) {
    return z.never();
  }

  throw new Error('Array must have a length');
}

export function createRecordOf<
  T extends readonly string[],
  ZodValueType extends z.ZodTypeAny
>(keys: T, zodValueType: ZodValueType) {
  return z.object(
    keys.reduce(
      (agg, k) => ({
        ...agg,
        [k]: zodValueType
      }),
      {} as Record<ArrayValues<T>, ZodValueType>
    )
  );
}
