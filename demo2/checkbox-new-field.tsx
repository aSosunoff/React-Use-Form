import React from "react";
import { useForm } from "../src";
import styles from "./app.module.scss";

interface CheckboxNewFieldProps {
  onChecked: (checked: boolean) => void;
}

export const CheckboxNewField: React.FC<CheckboxNewFieldProps> = ({
  onChecked,
}) => {
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

          onChecked(target.checked);
        }}
      />

      <div>Добавить поля</div>
    </div>
  );
};
