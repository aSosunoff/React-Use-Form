type RecordObject = Record<string, any>;

export type ReduceConfigTransformType = <
  TObject extends RecordObject,
  Key extends keyof TObject,
  Result
>(
  obj: TObject,
  callback: (config: TObject[Key], key: Key, obj?: TObject) => Result
) => {
  [k in Key]: Result;
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
