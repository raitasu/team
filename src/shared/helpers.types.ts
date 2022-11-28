export type ArrayValues<TypeOfArray> = TypeOfArray extends
  | Array<infer Item>
  | ReadonlyArray<infer Item>
  ? Item
  : TypeOfArray;

export type DashToSnakeCase<Key extends string> =
  Key extends `${infer FirstPart}-${infer FirstLetter}${infer LastPart}`
    ? `${FirstPart}_${Lowercase<FirstLetter>}${DashToSnakeCase<LastPart>}`
    : Key;
