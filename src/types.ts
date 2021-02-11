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

type Keys<T extends InitialForm<any>> = T extends InitialForm<infer R>
  ? R
  : never;

type RecordKeys<T extends InitialForm<any>> = {
  [key in Keys<T>]?:
    | (string | boolean | number | any[])
    | {
        value: any;
        touched?: boolean;
      };
};

export interface ISetValue<T extends InitialForm<any>> {
  (key: Keys<T>, value: any, touched?: boolean): void;
  (key: RecordKeys<T>): void;
}
