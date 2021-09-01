import React, { useCallback, useEffect } from "react";
import { useForm, InitialFormType } from "../src";
import styles from "./app.module.scss";

const init_form: InitialFormType<"name" | "age"> = {
  name: {
    value: "",
  },
  age: {
    value: "30",
  },
};

const EMPTY_OBJ = {};

const init_form_for_create: InitialFormType<"nameFieldForCreate"> = {
  nameFieldForCreate: {
    value: "",
  },
};

export const App = () => {
  const form = useForm(init_form);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const { handlers } = form;

  /* form.setValues<keyof typeof init_form>({}); */

  /*  */

  const formCreate = useForm(init_form_for_create);

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

  return (
    <div className={styles.container}>
      <div className={styles["field-create"]}>
        <input
          value={formCreate.handlers.nameFieldForCreate.value}
          onKeyUp={(ev) => {
            if (ev.key === "Enter") {
              createNewField(formCreate.values.nameFieldForCreate);
            }
          }}
          onChange={({ target }) => {
            formCreate.handlers.nameFieldForCreate.onChange(target.value);
          }}
        />

        <button
          onClick={() => {
            createNewField(formCreate.values.nameFieldForCreate);
          }}
        >
          Создать новое поле
        </button>
      </div>

      <button onClick={form.reset}>Сбросить</button>

      <button onClick={form.clear}>Очистить</button>

      {Object.entries(handlers).map(([name, config], index) => (
        <div key={index} className={styles.field}>
          <div>{name}</div>

          <input
            tabIndex={index}
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

      {form.isInvalidForm ? <div>На форме есть ошибки</div> : null}
    </div>
  );
};
