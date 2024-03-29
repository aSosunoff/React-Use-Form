export declare type ReduceConfigTransformType = <TObject extends Record<string, any>, Result>(obj: TObject, callback: (config: TObject[keyof TObject], key: keyof TObject, obj?: TObject) => Result) => {
    [k in keyof TObject]: Result;
};
export declare type InitialForm<T extends string> = {
    [key in T]: {
        value: any;
        validation?: (value: any) => undefined | {
            errorMessage: string;
        };
    };
};
export declare type Values<T extends InitialForm<any> | undefined> = T extends InitialForm<any> ? Record<keyof T, any> : Partial<Record<string, any>>;
export declare type HandlersConfig = {
    value: any;
    error: {
        errorMessage: string;
    } | undefined;
    touched: boolean;
    onChange: (value: any) => void;
};
export declare type Handlers<T extends InitialForm<any> | undefined> = T extends InitialForm<any> ? Record<keyof T, HandlersConfig> : Partial<Record<string, HandlersConfig>>;
