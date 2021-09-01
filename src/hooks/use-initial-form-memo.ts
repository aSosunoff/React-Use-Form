import { useCallback, useState } from "react";
import { InitialForm } from "../types";

export const useInitialFormMemo = (initialForm?: InitialForm<string>) => {
  const [initialFormMemo, setInitialFormMemo] = useState(
    () => initialForm ?? {}
  );

  const initialFormMemoHandler = useCallback(
    (initialForm: InitialForm<string>) => {
      setInitialFormMemo(() => initialForm);
    },
    []
  );

  const add = useCallback((newFields: InitialForm<string>) => {
    setInitialFormMemo((prev) => ({
      ...newFields,
      ...prev,
    }));
  }, []);

  const remove = useCallback(<F extends any>(...fieldsName: F[]) => {
    setInitialFormMemo((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([field]) => !fieldsName.includes(field as F)
        )
      )
    );
  }, []);

  return {
    initialFormMemo,
    initialFormMemoHandler,
    add,
    remove,
  };
};
