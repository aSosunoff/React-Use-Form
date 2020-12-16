export const initialControl = (config) => ({
  ...config,
  touched: false,
  invalid: Boolean(config.validation),
});

export const isPrimitive = (value) => value !== Object(value);

export const reduceConfigTransform = (obj, callback) =>
  Object.entries(obj).reduce(
    (acc, [key, config]) => ({ ...acc, [key]: callback(config, key) }),
    {}
  );
