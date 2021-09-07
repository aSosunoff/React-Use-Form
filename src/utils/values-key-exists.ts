export const valuesKeyExists = (
  values: Record<string, any> | Partial<Record<string, any>>
): values is Record<string, any> => Boolean(Object.keys(values).length);
