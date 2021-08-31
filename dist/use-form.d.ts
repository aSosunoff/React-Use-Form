import { InitialForm } from "./types";
declare type Values<T extends InitialForm<any>> = {
    [k in keyof T]: any;
} & Record<string, any>;
declare type HandlersConfig = {
    value: any;
    error: {
        errorMessage: string;
    } | undefined;
    touched: boolean;
    onChange: (value: any) => void;
};
declare type Handlers<T extends InitialForm<any>> = {
    [k in keyof T]: HandlersConfig;
} & Record<string, HandlersConfig>;
export declare const useForm: <T extends InitialForm<any>>(initialForm: T) => {
    values: Values<T>;
    handlers: Handlers<T>;
    resetHandler: () => void;
    setValues: (obj: { [key in keyof T]?: {
        value: any;
        touched?: boolean | undefined;
    } | undefined; }) => void;
    setValue: (key: keyof T, value: any, touched?: boolean | undefined) => void;
    addFields: (obj: {
        [field: string]: {
            value: any;
            touched?: boolean | undefined;
            validation?: ((value: any) => undefined | {
                errorMessage: string;
            }) | undefined;
        };
    }) => void;
    removeField: (fieldName: string) => void;
    isInvalidForm: boolean;
};
export {};
