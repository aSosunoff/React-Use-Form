import React from "react";
import cn from "classnames";
import styles from "./BaseButton.module.scss";

export interface BaseButtonProps extends React.HTMLProps<HTMLButtonElement> {
  tag?: "button" | "a" | "Link";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  invalid?: boolean;
  invalidMessage?: string | any;
  classNameContainer?: string;
  classNameButton?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  tag = "button",
  type = "button",
  disabled,
  invalid,
  invalidMessage,
  classNameContainer,
  classNameButton,
  children,
  ...props
}) => {
  const classDisabled = { [styles.disabled]: disabled };

  if (disabled) {
    props.onClick = (e) => e.preventDefault();
  }

  const buttonElement = React.createElement(
    tag,
    {
      key: "button",
      className: cn(classNameButton, styles.button, classDisabled),
      type,
      ...props,
    },
    children
  );

  const invalidElement = invalid
    ? React.createElement(
        "small",
        {
          key: "error",
          className: cn(styles.button__invalid, classDisabled),
        },
        invalidMessage
      )
    : null;

  return React.createElement("div", { className: classNameContainer }, [
    buttonElement,
    invalidElement,
  ]);
};

/* export default BaseButton; */
