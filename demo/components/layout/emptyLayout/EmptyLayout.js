import React from "react";
import styles from "./EmptyLayout.module.scss";
import cn from "classnames";

const EmptyLayout = ({ children }) => {
	return (
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
};

export default EmptyLayout;
