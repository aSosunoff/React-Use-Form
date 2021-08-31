import { useCallback, useMemo, useState } from "react";
import { InitialForm } from "./types";
import { useDidUpdate } from "./use-did-update";
import { initialFn, reduceConfigTransform } from "./utils";

export const useForm = <T extends InitialForm<any>>(initialForm: T) => {
  const [form, setForm] = useState(() => initialFn<keyof T>(initialForm));

  useDidUpdate(() => {
    setForm(() => initialFn<keyof T>(initialForm));
  }, [initialForm]);

  const values = useMemo<{ [k in keyof T]: any } & Record<string, any>>(
    () => reduceConfigTransform(form, ({ value }) => value),
    [form]
  );

  const addFields = useCallback(
    (obj: {
      [field: string]: {
        value: any;
        touched?: boolean;
        validation?: (value: any) =>
          | undefined
          | {
              errorMessage: string;
            };
      };
    }) => {
      setForm((prev) => ({
        ...prev,
        ...reduceConfigTransform(obj, (config) => ({
          ...config,
          error: config?.validation && config.validation(config.value),
          touched: config?.touched ?? false,
          value: config.value,
        })),
      }));
    },
    []
  );

  const removeField = useCallback((fieldName: string) => {
    setForm((prev) => ({
      ...(Object.fromEntries(
        Object.entries(prev).filter(([field]) => field !== fieldName)
      ) as typeof prev),
    }));
  }, []);

  const setValue = useCallback(
    (key: keyof T, value: any, touched?: boolean) => {
      setForm((prev) => {
        const config = prev[key];

        if (!config) return prev;

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
        value: config.value,
        error: config.error,
        touched: config.touched,
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
    () => setForm(() => initialFn<keyof T>(initialForm)),
    [initialForm]
  );

  return {
    values,
    handlers,
    resetHandler,
    setValues,
    setValue,
    addFields,
    removeField,
    isInvalidForm,
  };
};
