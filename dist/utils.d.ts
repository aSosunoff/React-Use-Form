import { InitialForm, ReduceConfigTransformType } from "./types";
export declare const isPrimitive: <T>(value: T) => boolean;
export declare const reduceConfigTransform: ReduceConfigTransformType;
export declare const initialFn: <T extends InitialForm<any>>(initialForm: T) => { [k in keyof T]: T[keyof T] & {
    touched: boolean;
    error: {
        errorMessage: string;
    } | undefined;
}; };
