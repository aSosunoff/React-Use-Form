import { useCallback, useRef } from "react";
import { InitialForm } from "../types";
import { initialFn } from "../utils";

export const useInitialFormMemo = <T extends InitialForm<any>>(
  initialForm: T
) => {
  const initialFormMemo = useRef(initialForm);

  const add = useCallback((newFields: ReturnType<typeof initialFn>) => {
    initialFormMemo.current = {
      ...newFields,
      ...initialFormMemo.current,
    };
  }, []);

  const remove = useCallback(<F extends any>(...fieldsName: F[]) => {
    initialFormMemo.current = Object.fromEntries(
      Object.entries(initialFormMemo.current).filter(
        ([field]) => !fieldsName.includes(field as F)
      )
    ) as T;
  }, []);

  return {
    initialFormMemo: initialFormMemo.current,
    add,
    remove,
  };
};
