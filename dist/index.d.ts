export declare type InitialForm<T extends keyof any> = {
    [key in T]: {
        value: any;
        validation?: (value: any) => undefined | {
            errorMessage: string;
        };
    };
};
declare type KeyList<T extends InitialForm<any>> = T extends InitialForm<infer R> ? R : never;
declare type SetValueKey<T extends InitialForm<any>> = {
    [key in KeyList<T>]?: (string | boolean | number) | {
        value: any;
        touched: boolean;
    };
};
export declare const useForm: <T extends InitialForm<any>>(initialForm: T) => {
    values: { [k in keyof T]: any; };
    handlers: { [k_1 in keyof T]: { [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[keyof T] & {
        onChange: <T_1 extends HTMLTextAreaElement | HTMLInputElement>(ev: any) => void;
    } extends Record<string, any> ? { [K_1 in keyof Partial<{ [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[k_1]>]: K_1 extends keyof { [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[keyof T] | "onChange" ? ({ [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[keyof T] & {
        onChange: <T_1 extends HTMLTextAreaElement | HTMLInputElement>(ev: any) => void;
    })[K_1] : Partial<{ [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[k_1]>[K_1]; } & { [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[keyof T] & {
        onChange: <T_1 extends HTMLTextAreaElement | HTMLInputElement>(ev: any) => void;
    } : { [k_2 in keyof T]: T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    } extends Record<string, any> ? { [K in keyof Partial<T[k_2]>]: K extends keyof T[keyof T] | "touched" | "invalid" | "error" ? (T[keyof T] & {
        touched: boolean;
        invalid: boolean;
        error: {
            errorMessage: string;
        } | undefined;
    })[K] : Partial<T[k_2]>[K]; } & T[keyof T] & {
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
    }; }[keyof T] & {
        onChange: <T_1 extends HTMLTextAreaElement | HTMLInputElement>(ev: any) => void;
    }; };
    resetHandler: () => void;
    setValue: (key: KeyList<T> | SetValueKey<T>, value: any, touched: boolean) => void;
    isInvalidForm: boolean;
};
export {};
