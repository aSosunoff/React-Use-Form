import React, { useCallback, useState } from "react";
import cn from "classnames";
import is from "is_js";

import { useForm, InitialForm } from "../../../src";
/* import { useForm, InitialForm } from "../../../dist"; */
import Input from "../UI/input";
import BlackButton from "../UI/button/blackButton";
import Progress from "../UI/progress";
import styles from "./App.module.scss";

const INITIAL_FORM: InitialForm<"text" | "email" | "login" | "password"> = {
  text: {
    value: "",
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
  },
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const {
    values,
    handlers: { text, email, login, password },
    isInvalidForm,
    reset,
  } = useForm(INITIAL_FORM);

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
      onReset={reset}
    >
      <div className="card-content">
        <Input
          value={text.value}
          disabled={loading}
          onChange={text.onChange}
          invalid={text.touched && Boolean(text.error)}
          invalidMessage={text.error?.errorMessage}
          type="text"
          label="text"
        />

        <Input
          value={email.value}
          disabled={loading}
          onChange={email.onChange}
          invalid={email.touched && Boolean(email.error)}
          invalidMessage={email.error?.errorMessage}
          label="email"
          type="email"
        />

        <Input
          value={login.value}
          disabled={loading}
          onChange={login.onChange}
          invalid={login.touched && Boolean(login.error)}
          invalidMessage={login.error?.errorMessage}
          label="Логин"
          type="text"
        />

        <Input
          value={password.value}
          disabled={loading}
          onChange={password.onChange}
          invalid={password.touched && Boolean(password.error)}
          invalidMessage={password.error?.errorMessage}
          label="Пароль"
          type="password"
        />
      </div>

      <div className={cn("card-action", styles["card-action"])}>
        <BlackButton
          type="submit"
          disabled={isInvalidForm || loading}
          classNameContainer={styles["submit-button"]}
        >
          Отправить
        </BlackButton>

        <BlackButton type="reset" disabled={isInvalidForm || loading}>
          Сбросить
        </BlackButton>
      </div>

      <Progress canVisible={loading} />
    </form>
  );
};

export default App;
