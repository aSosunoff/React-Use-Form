import { useCallback, useMemo, useState } from "react";
import { isPrimitive, reduceConfigTransform } from "./utils";

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

type KeyList<T extends InitialForm<any>> = T extends InitialForm<infer R>
  ? R
  : never;

type SetValueKey<T extends InitialForm<any>> = {
  [key in KeyList<T>]?:
    | (string | boolean | number)
    | {
        value: any;
        touched: boolean;
      };
};

const initialFn = <T extends InitialForm<any>>(initialForm: T) =>
  reduceConfigTransform(initialForm, (config) => {
    const error = config.validation && config.validation(config.value);
    return {
      ...config,
      touched: false,
      invalid: Boolean(error),
      error,
    };
  });

export const useForm = <T extends InitialForm<any>>(initialForm: T) => {
  const [form, setForm] = useState(() => initialFn(initialForm));

  const values = useMemo(
    () => reduceConfigTransform(form, ({ value }) => value),
    [form]
  );

  const setValue = useCallback(
    (key: KeyList<T> | SetValueKey<T>, value: any, touched: boolean) => {
      if (typeof key === "object") {
        setForm((prev) =>
          reduceConfigTransform(prev, (config, field) => {
            if (!(field in key)) {
              return config;
            }

            let _value;
            let _touched;

            if (isPrimitive((key as any)[field])) {
              _value = (key as any)[field];
            } else {
              _value = (key as any)[field].value;
              _touched = (key as any)[field].touched;
            }

            const error = config.validation && config.validation(_value);

            return {
              ...config,
              error,
              invalid: Boolean(error),
              touched: _touched ?? config.touched,
              value: _value ?? config.value,
            };
          })
        );
      } else {
        setForm((prev) => {
          const config = prev[key];
          const error = config.validation && config.validation(value);
          return {
            ...prev,
            [key]: {
              ...config,
              error: error,
              invalid: Boolean(error),
              touched: touched ?? config.touched,
              value,
            },
          };
        });
      }
    },
    []
  );

  const onChange = useCallback(
    (key: any) => <T extends HTMLTextAreaElement | HTMLInputElement>(
      ev: React.ChangeEvent<T> | any
    ) => {
      setValue(key, ev.target ? ev.target.value : ev, true);
    },
    [setValue]
  );

  const handlers = useMemo(
    () =>
      reduceConfigTransform(form, (config, key) => ({
        ...config,
        onChange: onChange(key),
      })),
    [onChange, form]
  );

  const isInvalidForm = useMemo(
    () =>
      Object.values(form).reduce((acc, { invalid }) => acc || invalid, false),
    [form]
  );

  const resetHandler = useCallback(
    () => setForm(() => initialFn(initialForm)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    values,
    handlers,
    resetHandler,
    setValue,
    isInvalidForm,
  };
};
