import React from "react";
import { BaseButton, BaseButtonProps } from "../baseButton";
import styles from "./BlackButton.module.scss";

const BlackButton: React.FC<
  Omit<BaseButtonProps, "classNameContainer" | "classNameButton">
> = ({ children, ...props }) => (
  <BaseButton
    classNameContainer={styles.black}
    classNameButton={styles.button}
    {...props}
  >
    {children}
  </BaseButton>
);

export default BlackButton;
