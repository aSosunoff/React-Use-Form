import { useCallback, useMemo, useRef, useState } from "react";
import { InitialForm } from "./types";
import { useDidUpdate } from "./use-did-update";
import { initialFn, reduceConfigTransform } from "./utils";

type Values<T extends InitialForm<any>> = { [k in keyof T]: any } &
  Record<string, any>;

type HandlersConfig = {
  value: any;
  error:
    | {
        errorMessage: string;
      }
    | undefined;
  touched: boolean;
  onChange: (value: any) => void;
};

type Handlers<T extends InitialForm<any>> = {
  [k in keyof T]: HandlersConfig;
} &
  Record<string, HandlersConfig>;

const useInitialFormMemo = <T extends InitialForm<any>>(initialForm: T) => {
  const initialFormMemo = useRef(initialForm);

  const add = useCallback((newFields: ReturnType<typeof initialFn>) => {
    initialFormMemo.current = {
      ...newFields,
      ...initialFormMemo.current,
    };
  }, []);

  const remove = useCallback(<F extends any>(...fieldsName: F[]) => {
    initialFormMemo.current = Object.fromEntries(
      Object.entries(initialFormMemo.current).filter(
        ([field]) => !fieldsName.includes(field as F)
      )
    ) as T;
  }, []);

  return {
    initialFormMemo: initialFormMemo.current,
    add,
    remove,
  };
};

export const useForm = <T extends InitialForm<any>>(initialForm: T) => {
  const [form, setForm] = useState(() => initialFn(initialForm));

  const { initialFormMemo, add, remove } = useInitialFormMemo(initialForm);

  useDidUpdate(() => {
    setForm(() => initialFn(initialForm));
  }, [initialForm]);

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
      const newFields = reduceConfigTransform(obj, (config) => ({
        ...config,
        error: config?.validation && config.validation(config.value),
        touched: config?.touched ?? false,
        value: config.value,
      }));

      add(newFields);

      setForm((prev) => ({
        ...newFields,
        ...prev,
      }));
    },
    [add]
  );

  const removeField = useCallback(
    <F extends any>(...fieldsName: F[]) => {
      remove(fieldsName);

      setForm((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(
            ([field]) => !fieldsName.includes(field as F)
          )
        )
      );
    },
    [remove]
  );

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
    <F extends string>(
      fields: {
        [key in F]?: {
          value: any;
          touched?: boolean;
        };
      }
    ) => {
      setForm((prev) =>
        reduceConfigTransform(prev, (config, field) => {
          if (!(field in fields)) return config;

          const _value = fields[field as F]?.value;

          return {
            ...config,
            error: config.validation && config.validation(_value),
            touched: fields[field as F]?.touched ?? config.touched,
            value: _value ?? config.value,
          };
        })
      );
    },
    []
  );

  const handlers = useMemo<Handlers<T>>(
    () =>
      reduceConfigTransform(form, (config, key) => ({
        value: config.value,
        error: config.error,
        touched: config.touched,
        onChange: (value: any) => setValue(key, value, true),
      })) as Handlers<T>,
    [setValue, form]
  );

  //#region Helper constant
  const isInvalidForm = useMemo(
    () =>
      Object.values(form).reduce(
        (acc, { error }) => acc || Boolean(error),
        false
      ),
    [form]
  );

  const values = useMemo<Values<T>>(
    () => reduceConfigTransform(form, ({ value }) => value) as Values<T>,
    [form]
  );
  //#endregion

  //#region Clean
  const reset = useCallback(
    () => setForm(() => initialFn(initialFormMemo)),
    [initialFormMemo]
  );

  const clear = useCallback(
    () =>
      setForm((prev) =>
        reduceConfigTransform(prev, (config) => ({
          ...config,
          value: "",
          touched: true,
          error: config.validation && config.validation(""),
        }))
      ),
    []
  );
  //#endregion

  return {
    values,
    handlers,
    reset,
    clear,
    setValues,
    addFields,
    removeField,
    isInvalidForm,
  };
};
