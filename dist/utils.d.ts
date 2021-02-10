import { InitialForm, ReduceConfigTransformType } from "./types";
export declare const isPrimitive: <T>(value: T) => boolean;
export declare const reduceConfigTransform: ReduceConfigTransformType;
export declare const initialFn: <T extends InitialForm<any>>(initialForm: T) => { [k in keyof T]: T[keyof T] & {
    touched: boolean;
    invalid: boolean;
    error: {
        errorMessage: string;
    } | undefined;
} extends Record<string, any> ? { [K in keyof Partial<T[k]>]: K extends "touched" | "invalid" | "error" | keyof T[keyof T] ? (T[keyof T] & {
    touched: boolean;
    invalid: boolean;
    error: {
        errorMessage: string;
    } | undefined;
})[K] : Partial<T[k]>[K]; } & T[keyof T] & {
    touched: boolean;
    invalid: boolean;
    error: {
        errorMessage: string;
    } | undefined;
} : T[keyof T] & {
    touched: boolean;
    invalid: boolean;
    error: {
        errorMessage: string;
    } | undefined;
}; };
