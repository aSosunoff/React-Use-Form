import React, { useEffect } from "react";
import { useForm } from "../src";
import styles from "./app.module.scss";

const init_form = {
  name: {
    value: "",
  },
};

export const App = () => {
  const form = useForm(init_form);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const { handlers } = form;

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          form.addFields({
            newField: {
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
        }}
      >
        Создать новое поле
      </button>
      <button
        onClick={() => {
          form.removeField("newField");
        }}
      >
        Удалить поле
      </button>

      {Object.entries(handlers).map(([name, config], index) => (
        <div key={index} className={styles.field}>
          <div>{name}</div>

          <input
            name={name}
            value={config.value}
            onChange={({ target }) => {
              config.onChange(target.value);
            }}
          />

          {config.touched && config.error && (
            <div>{config.error.errorMessage}</div>
          )}
        </div>
      ))}
    </div>
  );
};
