import { Handlers, InitialForm, Values } from "./types";
export declare const useForm: <T extends InitialForm<any>>(initialForm?: T | undefined) => {
    values: Values<T>;
    handlers: Handlers<T>;
    initialFormHandler: (initialForm: InitialForm<string>) => void;
    reset: () => void;
    clear: () => void;
    setValues: <F extends string>(fields: { [key in F]?: {
        value: any;
        touched?: boolean | undefined;
    } | undefined; }) => void;
    addFields: (configs: InitialForm<string>) => void;
    removeField: <F_1 extends unknown>(...fieldsName: F_1[]) => void;
    isInvalidForm: boolean;
};
