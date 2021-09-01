import { useCallback, useRef } from "react";
import { InitialForm } from "../types";

export const useInitialFormMemo = (initialForm?: InitialForm<string>) => {
  const initialFormMemo = useRef(initialForm ?? {});

  const initialFormMemoHandler = useCallback(
    (initialForm: InitialForm<string>) => {
      initialFormMemo.current = initialForm;
    },
    []
  );

  const addFieldsToMemoHandler = useCallback(
    (newFields: InitialForm<string>) => {
      initialFormMemo.current = {
        ...newFields,
        ...initialFormMemo.current,
      };
    },
    []
  );

  const removeFieldsFromMemoHandler = useCallback(
    <F extends any>(...fieldsName: F[]) => {
      initialFormMemo.current = Object.fromEntries(
        Object.entries(initialFormMemo.current).filter(
          ([field]) => !fieldsName.includes(field as F)
        )
      );
    },
    []
  );

  return {
    initialFormMemo,
    initialFormMemoHandler,
    addFieldsToMemoHandler,
    removeFieldsFromMemoHandler,
  };
};
