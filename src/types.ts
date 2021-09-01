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

export type Values<T extends InitialForm<any>> = { [k in keyof T]: any } &
  Record<string, any>;

export type HandlersConfig = {
  value: any;
  error:
    | {
        errorMessage: string;
      }
    | undefined;
  touched: boolean;
  onChange: (value: any) => void;
};

export type Handlers<T extends InitialForm<any>> = {
  [k in keyof T]: HandlersConfig;
} &
  Record<string, HandlersConfig>;
