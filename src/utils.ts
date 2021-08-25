import { InitialForm, ReduceConfigTransformType } from "./types";

export const isPrimitive = (value: unknown): value is true =>
  value !== Object(value);

export const reduceConfigTransform: ReduceConfigTransformType = (
  obj,
  callback
) =>
  Object.entries(obj).reduce(
    (acc, [key, config]) => ({
      ...acc,
      [key]: callback(config, key as any, obj),
    }),
    {} as any
  );

export const initialFn = <T extends InitialForm<any>>(initialForm: T) =>
  reduceConfigTransform(initialForm, (config) => ({
    ...config,
    touched: false,
    error: config.validation && config.validation(config.value),
  }));
