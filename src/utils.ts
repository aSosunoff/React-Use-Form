import { InitialForm, ReduceConfigTransformType } from "./types";

export const isPrimitive = (value: unknown): value is true =>
  value !== Object(value);

export type CompressType<T extends Record<any, any>, F extends keyof T[any]> = {
  [key in keyof T]: T[key][F];
};

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

export const initialFn = <T extends keyof any>(initialForm: InitialForm<T>) =>
  reduceConfigTransform(initialForm, (config) => ({
    ...config,
    touched: false,
    error: config.validation && config.validation(config.value),
  }));
