import { z } from 'zod';

export type ArrayValues<TypeOfArray> = TypeOfArray extends
  | Array<infer Item>
  | ReadonlyArray<infer Item>
  ? Item
  : TypeOfArray;

export type DashToSnakeCase<Key extends string> =
  Key extends `${infer FirstPart}-${infer FirstLetter}${infer LastPart}`
    ? `${FirstPart}_${Lowercase<FirstLetter>}${DashToSnakeCase<LastPart>}`
    : Key;

export const RecordOf = <
  T extends readonly string[],
  ZodValueType extends z.ZodTypeAny
>(
  keys: T,
  zodValueType: ZodValueType
) =>
  z.object(
    keys.reduce(
      (agg, k) => ({
        ...agg,
        [k]: zodValueType
      }),
      {} as Record<ArrayValues<T>, ZodValueType>
    )
  );
