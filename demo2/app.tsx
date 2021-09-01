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

const init_form_for_create: InitialFormType<"name" | "newField"> = {
  name: {
    value: "",
  },
  newField: {
    value: false,
  },
};

export const App = () => {
  const form = useForm(init_form);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const { handlers } = form;

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
          value={formCreate.handlers.name.value}
          onKeyUp={(ev) => {
            if (ev.key === "Enter") {
              createNewField(formCreate.values.name);
            }
          }}
          onChange={({ target }) => {
            formCreate.handlers.name.onChange(target.value);
          }}
        />

        <button
          onClick={() => {
            createNewField(formCreate.values.name);
          }}
        >
          Создать новое поле
        </button>
      </div>

      <button onClick={form.reset}>Сбросить</button>

      <button onClick={form.clear}>Очистить</button>

      <div className={styles["checkbox-container"]}>
        <input
          type="checkbox"
          value={formCreate.handlers.newField.value}
          onChange={({ target }) => {
            formCreate.handlers.newField.onChange(target.checked);

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
