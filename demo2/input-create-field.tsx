import React, { useCallback } from "react";
import { useForm } from "../src";
import styles from "./app.module.scss";

interface InputCreateFieldProps {
  form: ReturnType<typeof useForm>;
}

export const InputCreateField: React.FC<InputCreateFieldProps> = ({ form }) => {
  const {
    values,
    handlers: { name },
    reset,
  } = useForm({
    name: {
      value: "",
    },
  });

  const createNewField = useCallback(
    (fieldName: string) => {
      form.addFields({
        [fieldName]: {
          value: "",
          validation: (value: string) => {
            if (value.trim().length === 0) {
              return {
                errorMessage: "ошибка. поле обязательно для заполнения",
              };
            }
          },
        },
      });
    },
    [form]
  );

  const submit = useCallback(() => {
    createNewField(values.name);
    reset();
  }, [createNewField, values.name, reset]);

  const enterHandler = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(({ key }) => (key === "Enter" ? submit() : undefined), [submit]);

  return (
    <div className={styles["field-create"]}>
      <input
        value={name.value}
        onKeyUp={enterHandler}
        onChange={({ target }) => {
          name.onChange(target.value);
        }}
      />

      <button onClick={submit}>Создать новое поле</button>
    </div>
  );
};
