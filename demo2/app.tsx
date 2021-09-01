import React, { useEffect } from "react";
import { useForm, InitialFormType } from "../src";
import styles from "./app.module.scss";

const init_form: InitialFormType<"name"> = {
  name: {
    value: "",
  },
};

const EMPTY_OBJ = {};

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
          form.reset();
        }}
      >
        Очистить
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

          <button
            onClick={() => {
              form.removeField(name);
            }}
          >
            Удалить поле
          </button>

          {config.touched && config.error && (
            <div className={styles.error}>{config.error.errorMessage}</div>
          )}
        </div>
      ))}
    </div>
  );
};
