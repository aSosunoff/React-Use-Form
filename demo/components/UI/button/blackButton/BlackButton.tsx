import React from "react";
import { BaseButton, BaseButtonProps } from "../baseButton";
import styles from "./BlackButton.module.scss";
import cn from "classnames";

const BlackButton: React.FC<BaseButtonProps> = ({ children, ...props }) => (
  <BaseButton
    classNameContainer={cn(styles.black, props.classNameContainer)}
    classNameButton={cn(styles.button, props.classNameButton)}
    {...props}
  >
    {children}
  </BaseButton>
);

export default BlackButton;
