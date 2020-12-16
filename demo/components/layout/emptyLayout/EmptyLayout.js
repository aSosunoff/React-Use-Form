import React from "react";
import cn from "classnames";
import styles from "./EmptyLayout.module.scss";

const EmptyLayout = ({ children }) => (
  <div
    className={cn(
      styles["grid-layout"],
      styles["grid-layout_center"],
      "blue-grey",
      "darken-3"
    )}
  >
    {children}
  </div>
);

export default EmptyLayout;
