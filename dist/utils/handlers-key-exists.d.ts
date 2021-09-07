import { HandlersConfig } from "../types";
export declare const handlersKeyExists: (handlers: Record<string, HandlersConfig> | Partial<Record<string, HandlersConfig>>) => handlers is Record<string, HandlersConfig>;
