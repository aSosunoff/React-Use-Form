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

  /* const { sdd } = handlers; */

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          form.addFields({
            newField: {
              value: "",
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
        <input
          key={index}
          name={name}
          value={config.value}
          onChange={({ target }) => {
            config.onChange(target.value);
          }}
        />
      ))}
    </div>
  );
};
