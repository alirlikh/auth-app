import React, { forwardRef } from "react";
import styles from "./BaseButton.module.scss";

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ label, children, ...props }, ref) => {
    return (
      <button ref={ref} className={styles.button} {...props}>
        {label || children}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
