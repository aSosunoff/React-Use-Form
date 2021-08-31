import { InitialForm, ReduceConfigTransformType } from "./types";
export declare const isPrimitive: (value: unknown) => value is true;
export declare type CompressType<T extends Record<any, any>, F extends keyof T[any]> = {
    [key in keyof T]: T[key][F];
};
export declare const reduceConfigTransform: ReduceConfigTransformType;
export declare const initialFn: <T extends string | number | symbol>(initialForm: InitialForm<T>) => { [k in T]: InitialForm<T>[T] & {
    touched: boolean;
    error: {
        errorMessage: string;
    } | undefined;
}; };
