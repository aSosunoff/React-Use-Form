import React, { useCallback, useState } from "react";
import is from "is_js";
import { useForm, InitialFormType } from "../../../src";
/* import { useForm, InitialForm } from "../../../dist"; */
import Input from "../UI/input";
import BlackButton from "../UI/button/blackButton";
import Progress from "../UI/progress";
import cn from "classnames";
import styles from "./App.module.scss";

const INITIAL_FORM: InitialFormType<"text" | "email" | "login" | "password"> = {
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
    resetHandler,
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
      onReset={resetHandler}
    >
      <div className="card-content">
        <Input
          value={text.value}
          disabled={loading}
          onChange={text.onChange}
          invalid={text.touched && text.invalid}
          invalidMessage={text.error?.errorMessage}
          type="text"
          label="text"
        />

        <Input
          value={email.value}
          disabled={loading}
          onChange={email.onChange}
          invalid={email.touched && email.invalid}
          invalidMessage={email.error?.errorMessage}
          label="email"
          type="email"
        />

        <Input
          value={login.value}
          disabled={loading}
          onChange={login.onChange}
          invalid={login.touched && login.invalid}
          invalidMessage={login.error?.errorMessage}
          label="Логин"
          type="text"
        />

        <Input
          value={password.value}
          disabled={loading}
          onChange={password.onChange}
          invalid={password.touched && password.invalid}
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
