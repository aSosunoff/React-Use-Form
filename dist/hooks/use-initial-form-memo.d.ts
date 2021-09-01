/// <reference types="react" />
import { InitialForm } from "../types";
export declare const useInitialFormMemo: (initialForm?: InitialForm<string> | undefined) => {
    initialFormMemo: import("react").MutableRefObject<InitialForm<string>>;
    initialFormMemoHandler: (initialForm: InitialForm<string>) => void;
    addFieldsToMemoHandler: (newFields: InitialForm<string>) => void;
    removeFieldsFromMemoHandler: <F extends unknown>(...fieldsName: F[]) => void;
};
