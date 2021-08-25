export declare type ReduceConfigTransformType = <TObject extends Record<string, any>, Key extends keyof TObject, Result>(obj: TObject, callback: (config: TObject[Key], key: Key, obj?: TObject) => Result) => {
    [k in Key]: Result;
};
export declare type InitialForm<T extends keyof any> = {
    [key in T]: {
        value: any;
        validation?: (value: any) => undefined | {
            errorMessage: string;
        };
    };
};
