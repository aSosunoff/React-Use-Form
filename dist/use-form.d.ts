import { InitialForm } from "./types";
export declare const useForm: <T extends InitialForm<any>>(initialForm: T) => {
    values: { [k in keyof T]: any; };
    handlers: { [k_1 in keyof T]: {
        value: any;
        error: {
            errorMessage: string;
        } | undefined;
        touched: boolean;
        onChange: (value: any) => void;
    }; };
    resetHandler: () => void;
    setValues: (obj: { [key in keyof T]?: {
        value: any;
        touched?: boolean | undefined;
    } | undefined; }) => void;
    setValue: (key: keyof T, value: any, touched?: boolean | undefined) => void;
    isInvalidForm: boolean;
};
