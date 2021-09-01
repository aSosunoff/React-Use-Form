import { useInitialFormMemo } from "./hooks/use-initial-form-memo";
import { useCallback, useMemo, useState } from "react";
import { Handlers, InitialForm, Values } from "./types";
/* import { useDidUpdate } from "./hooks/use-did-update"; */
import { initialFn, reduceConfigTransform } from "./utils";

export const useForm = <T extends InitialForm<any>>(initialForm?: T) => {
  const { initialFormMemo, initialFormMemoHandler, add, remove } =
    useInitialFormMemo(initialForm);

  //#region
  const [form, setForm] = useState(() =>
    initialForm ? initialFn(initialForm) : initialFn({})
  );

  /* useDidUpdate(() => {
    setForm(() => (initialForm ? initialFn(initialForm) : initialFn({})));
  }, [initialForm]); */

  const addFieldsToFormHandler = useCallback(
    (newFields: ReturnType<typeof initialFn>) => {
      setForm((prev) => ({
        ...newFields,
        ...prev,
      }));
    },
    []
  );

  const removeFieldsFromFormHandler = useCallback(
    <F extends any>(...fieldsName: F[]) => {
      setForm((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(
            ([field]) => !fieldsName.includes(field as F)
          )
        )
      );
    },
    []
  );

  const initialFormHandler = useCallback(
    (initialForm: InitialForm<string>) => {
      setForm(() => initialFn(initialForm));
      initialFormMemoHandler(initialForm);
    },
    [initialFormMemoHandler]
  );

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

  const addFields = useCallback(
    (configs: InitialForm<string>) => {
      add(configs);

      addFieldsToFormHandler(initialFn(configs));
    },
    [add, addFieldsToFormHandler]
  );

  const removeField = useCallback(
    <F extends any>(...fieldsName: F[]) => {
      remove(...fieldsName);

      removeFieldsFromFormHandler(...fieldsName);
    },
    [remove, removeFieldsFromFormHandler]
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

  //#region helper constant
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

  return {
    values,
    handlers,
    initialFormHandler,
    reset,
    clear,
    setValues,
    addFields,
    removeField,
    isInvalidForm,
  };
};
