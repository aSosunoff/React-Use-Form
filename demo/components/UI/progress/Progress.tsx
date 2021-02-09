import React from "react";
import cn from "classnames";
import styles from "./Progress.module.scss";

interface ProgressProps {
  canVisible: boolean;
}

const Progress: React.FC<ProgressProps> = ({ canVisible }) => {
  return (
    <>
      {canVisible ? (
        <div className={cn("progress", styles.progress)}>
          <div className={cn("indeterminate", styles.indeterminate)}></div>
        </div>
      ) : null}
    </>
  );
};

export default Progress;
