import { useCallback, useMemo, useState } from "react";
import {
  isPrimitive,
  valid,
  buildControl,
  reduceConfigTransform,
} from "./utils";

export const useForm = (initialForm = {}) => {
  const [form, setForm] = useState(
    reduceConfigTransform(initialForm, buildControl)
  );

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

          if (isPrimitive(key[field])) {
            _value = key[field];
          } else {
            _value = key[field].value;
            _touched = key[field].touched;
          }

          return {
            ...config,
            ...valid(_value, config.validation),
            touched: _touched ?? config.touched,
            value: _value ?? config.value,
          };
        })
      );
    } else {
      setForm((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          ...valid(value, prev[key].validation),
          touched: touched ?? prev[key].touched,
          value,
        },
      }));
    }
  }, []);

  const onChange = useCallback(
    (key) => (ev) => {
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

  const isFormInvalid = useMemo(
    () =>
      Object.values(form).reduce((acc, { invalid }) => acc || invalid, false),
    [form]
  );

  const reset = useCallback(() => {
    setForm(reduceConfigTransform(initialForm, buildControl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    values,
    reset,
    handlers,
    setValue,
    isFormInvalid,
  };
};
