import { useCallback, useMemo, useState } from "react";
import { InitialForm } from "./types";
import { useDidUpdate } from "./use-did-update";
import { initialFn, reduceConfigTransform } from "./utils";

export const useForm = <T extends InitialForm<any>>(initialForm: T) => {
  const [form, setForm] = useState(() => initialFn(initialForm));

  useDidUpdate(() => {
    setForm(() => initialFn(initialForm));
  }, [initialForm]);

  const values = useMemo(
    () => reduceConfigTransform(form, ({ value }) => value),
    [form]
  );

  const setValue = useCallback(
    (key: keyof T, value: any, touched?: boolean) => {
      setForm((prev) => {
        const config = prev[key];

        return {
          ...prev,
          [key]: {
            ...config,
            error: config.validation && config.validation(value),
            touched: touched ?? config.touched,
            value,
          },
        };
      });
    },
    []
  );

  const setValues = useCallback(
    (
      obj: {
        [key in keyof T]?: {
          value: any;
          touched?: boolean;
        };
      }
    ) => {
      setForm((prev) =>
        reduceConfigTransform(prev, (config, field) => {
          if (!(field in obj)) return config;

          const _value = obj[field]?.value;

          return {
            ...config,
            error: config.validation && config.validation(_value),
            touched: obj[field]?.touched ?? config.touched,
            value: _value ?? config.value,
          };
        })
      );
    },
    []
  );

  const handlers = useMemo(
    () =>
      reduceConfigTransform(form, (config, key) => ({
        ...config,
        onChange: (value: any) => setValue(key, value, true),
      })),
    [setValue, form]
  );

  const isInvalidForm = useMemo(
    () =>
      Object.values(form).reduce(
        (acc, { error }) => acc || Boolean(error),
        false
      ),
    [form]
  );

  const resetHandler = useCallback(
    () => setForm(() => initialFn(initialForm)),
    [initialForm]
  );

  return {
    values,
    handlers,
    resetHandler,
    setValues,
    setValue,
    isInvalidForm,
  };
};
