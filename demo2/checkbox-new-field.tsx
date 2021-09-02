import React from "react";
import { useForm } from "../src";
import styles from "./app.module.scss";

interface CheckboxNewFieldProps {
  form: ReturnType<typeof useForm>;
}

export const CheckboxNewField: React.FC<CheckboxNewFieldProps> = ({ form }) => {
  const {
    handlers: { newField },
  } = useForm({
    newField: {
      value: false,
    },
  });

  return (
    <div className={styles["checkbox-container"]}>
      <input
        type="checkbox"
        value={newField.value}
        onChange={({ target }) => {
          newField.onChange(target.checked);

          const nameField = "test1";

          if (target.checked) {
            form.addFields({
              [nameField]: {
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
          } else {
            form.removeField(nameField);
          }
        }}
      />

      <div>Добавить поля</div>
    </div>
  );
};
