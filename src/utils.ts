type Merge<A extends Record<string, any>, B extends Record<string, any>> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} &
  B;

export const isPrimitive = <T>(value: T) => value !== Object(value);

type ReduceConfigTransformType = <
  TObject extends Record<string, any>,
  Key extends keyof TObject,
  Result
>(
  obj: TObject,
  callback: (config: TObject[Key], key: Key, obj?: TObject) => Result
) => {
  [k in Key]: Result extends Record<string, any>
    ? Merge<Partial<TObject[k]>, Result>
    : Result;
};

export const reduceConfigTransform: ReduceConfigTransformType = (
  obj,
  callback
) =>
  Object.entries(obj).reduce(
    (acc, [key, config]) => ({
      ...acc,
      [key]: callback(config, key as any, obj),
    }),
    {} as any
  );
