import { InitialForm, ISetValue } from "./types";
export declare const useForm: <T extends InitialForm<any>>(initialForm: T) => {
    values: { [k in keyof T]: any; };
    handlers: { [k_1 in keyof T]: { [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    }; }[keyof T] & {
        onChange: <T_1 extends HTMLTextAreaElement | HTMLInputElement>(ev: any) => void;
    }; };
    resetHandler: () => void;
    setValue: ISetValue<T>;
    isInvalidForm: boolean;
};
