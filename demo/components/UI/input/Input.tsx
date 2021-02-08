import React, { useCallback, useMemo } from "react";
import { v4 } from "uuid";
import cn from "classnames";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  invalid: boolean;
  invalidMessage?: string | any;
  className?: string;
  type?:
    | "button"
    | "checkbox"
    | "file"
    | "hidden"
    | "image"
    | "password"
    | "radio"
    | "reset"
    | "submit"
    | "text"
    | "color"
    | "date"
    | "datetime"
    | "datetime-local"
    | "email"
    | "number"
    | "range"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "month"
    | "week";
  onChange: (value?: Pick<React.HTMLProps<HTMLInputElement>, "value">) => void;
}

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = ({
  type = "text",
  label,
  invalid,
  invalidMessage = "Необходимо заполнить поле",
  className,
  onChange,
  ...attrsInput
}) => {
  const uniq = useMemo(() => v4(), []);

  const onChangeHandler = useCallback(({ target }) => onChange(target.value), [
    onChange,
  ]);
  return (
    <div className={styles.input_container}>
      <input
        id={uniq}
        type={type}
        className={cn({ invalid, className })}
        onChange={onChangeHandler}
        {...attrsInput}
      />

      <label
        htmlFor={uniq}
        className={cn({
          active: Boolean(attrsInput?.value),
        })}
      >
        {label}
      </label>

      {invalid ? (
        <small className={cn("helper-text invalid", styles.invalid)}>
          {invalidMessage}
        </small>
      ) : null}
    </div>
  );
};

export default Input;
