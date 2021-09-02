import React, { useCallback } from "react";
import { useForm } from "../src";
import styles from "./app.module.scss";

interface InputCreateFieldProps {
  onCreate: (name: string) => void;
}

export const InputCreateField: React.FC<InputCreateFieldProps> = ({
  onCreate,
}) => {
  const {
    values,
    handlers: { name },
    reset,
  } = useForm({
    name: {
      value: "",
    },
  });

  const submit = useCallback(() => {
    onCreate(values.name);
    reset();
  }, [onCreate, values.name, reset]);

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
