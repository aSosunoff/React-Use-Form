import React, { useCallback, useState } from "react";
import is from "is_js";
import { useForm, InitialForm } from "../../../src";
/* import { useForm } from "../../../dist"; */
import Input from "../UI/input";
import BlackButton from "../UI/button/blackButton";
import Progress from "../UI/progress";

const INITIAL_FORM: InitialForm<"text" | "email" | "login" | "password"> = {
  text: {
    value: "",
    type: "text",
    label: "text",
  },
  email: {
    value: "",
    validation: (value) => {
      if (is.not.email(value)) {
        return {
          errorMessage: "Не правильно введён email",
        };
      }
    },
    type: "email",
    label: "email",
  },
  login: {
    value: "",
    validation: (value) => {
      if (is.empty(value)) {
        return {
          errorMessage: "Необходимо заполнить поле",
        };
      }
    },
    type: "text",
    label: "Логин",
  },
  password: {
    value: "",
    validation: (value) => {
      if (is.empty(value)) {
        return {
          errorMessage: "Необходимо заполнить поле",
        };
      }

      if (`${value}`.length < 4) {
        return {
          errorMessage: "Поле должно быть больше 4 символов",
        };
      }
    },
    type: "password",
    label: "Пароль",
  },
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const { values, handlers, isInvalidForm } = useForm(INITIAL_FORM);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log(values);
      }, 1000);
    },
    [values]
  );

  return (
    <form
      className="card hoverable"
      style={{
        gridArea: "cc",
        margin: 0,
      }}
      onSubmit={submitHandler}
    >
      <div className="card-content">
        {Object.entries(handlers).map(([key, config]) => (
          <Input
            key={key}
            label={config.label}
            value={config.value}
            disabled={loading}
            onChange={config.onChange}
            invalid={config.touched && config.invalid}
            invalidMessage={config.error?.errorMessage}
            type={config.type}
          />
        ))}
      </div>

      <div className="card-action">
        <BlackButton type="submit" disabled={isInvalidForm || loading}>
          Войти
        </BlackButton>
      </div>

      <Progress canVisible={loading} />
    </form>
  );
};

export default App;
