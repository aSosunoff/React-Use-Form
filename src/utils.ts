import { ReduceConfigTransformType } from "./types";

export const isPrimitive = <T>(value: T) => value !== Object(value);

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
