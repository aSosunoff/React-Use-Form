import React, { useEffect } from "react";
import { useForm, InitialForm } from "../src";
import styles from "./app.module.scss";
import { CheckboxNewField } from "./checkbox-new-field";
import { InputCreateField } from "./input-create-field";

const init_form: InitialForm<"name" | "age"> = {
  name: {
    value: "",
  },
  age: {
    value: "30",
  },
};

export const App = () => {
  /* const [initialForm, setInitialForm] = useState<InitialForm<any>>({
    name: { value: "" },
  }); */

  const form = useForm(init_form);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className={styles.container}>
      <InputCreateField
        onCreate={(name) => {
          form.addFields({
            [name]: {
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
      />

      <button onClick={form.reset}>Сбросить</button>

      <button onClick={form.clear}>Очистить</button>

      <CheckboxNewField form={form} />

      {Object.entries(form.handlers).map(([name, config], index) => (
        <div key={index} className={styles.field}>
          <div>{name}</div>

          <input
            tabIndex={index + 1}
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

      {form.isInvalidForm ? (
        <div style={{ color: "var(--error)" }}>На форме есть ошибки</div>
      ) : null}
    </div>
  );
};
