import { HandlersConfig } from "../types";

export const handlersKeyExists = (
  handlers:
    | Record<string, HandlersConfig>
    | Partial<Record<string, HandlersConfig>>
): handlers is Record<string, HandlersConfig> =>
  Boolean(Object.keys(handlers).length);
