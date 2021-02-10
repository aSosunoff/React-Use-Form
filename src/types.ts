type Merge<A extends Record<string, any>, B extends Record<string, any>> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} &
  B;

export type ReduceConfigTransformType = <
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

export type InitialForm<T extends keyof any> = {
  [key in T]: {
    value: any;
    validation?: (
      value: any
    ) =>
      | undefined
      | {
          errorMessage: string;
        };
  };
};

export type KeyList<T extends InitialForm<any>> = T extends InitialForm<infer R>
  ? R
  : never;

export type SetValueKey<T extends InitialForm<any>> = {
  [key in KeyList<T>]?:
    | (string | boolean | number)
    | {
        value: any;
        touched: boolean;
      };
};
