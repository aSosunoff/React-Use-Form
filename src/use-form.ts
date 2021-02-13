import { useCallback, useMemo, useState } from "react";
import { InitialForm, ISetValue } from "./types";
import { useComponentDidUpdate } from "./use-component-did-update";
import { initialFn, isPrimitive, reduceConfigTransform } from "./utils";

export const useForm = <T extends InitialForm<any>>(initialForm: T) => {
  const [form, setForm] = useState(() => initialFn(initialForm));

  useComponentDidUpdate(() => {
    setForm(() => initialFn(initialForm));
  }, [initialForm]);

  const values = useMemo(
    () => reduceConfigTransform(form, ({ value }) => value),
    [form]
  );

  const setValue = useCallback((key, value, touched) => {
    if (typeof key === "object") {
      setForm((prev) =>
        reduceConfigTransform(prev, (config, field) => {
          if (!(field in key)) {
            return config;
          }

          let _value;
          let _touched;

          if (Array.isArray(key[field]) || isPrimitive(key[field])) {
            _value = key[field];
          } else {
            _value = key[field].value;
            _touched = key[field].touched;
          }

          const error = config.validation && config.validation(_value);

          return {
            ...config,
            error,
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
            error,
            touched: touched ?? config.touched,
            value,
          },
        };
      });
    }
  }, []);

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
    setValue: setValue as ISetValue<T>,
    isInvalidForm,
  };
};
