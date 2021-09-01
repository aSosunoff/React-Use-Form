export type ReduceConfigTransformType = <
  TObject extends Record<string, any>,
  Result
>(
  obj: TObject,
  callback: (
    config: TObject[keyof TObject],
    key: keyof TObject,
    obj?: TObject
  ) => Result
) => {
  [k in keyof TObject]: Result;
};

export type InitialForm<T extends string> = {
  [key in T]: {
    value: any;
    validation?: (value: any) =>
      | undefined
      | {
          errorMessage: string;
        };
  };
};
