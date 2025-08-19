import React, { forwardRef } from "react";
import styles from "./BaseInput.module.scss";

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, ...props }, ref) => (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input ref={ref} className={`${styles.input} ${error ? styles.error : ""}`} {...props} />
    </div>
  )
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
