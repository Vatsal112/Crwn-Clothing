import classNames from "@/utils/classNames";
import styles from "./form-input.module.css";

import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({ label, ...inputConfig }: FormInputProps) => {
  return (
    <div className={styles.group}>
      <input
        className={classNames(styles["form-input"], styles.input)}
        {...inputConfig}
      />
      {label && (
        <label
          className={`${
            inputConfig.value && inputConfig.value.toString().length
              ? styles.shrink
              : ""
          } ${styles["form-input-label"]}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
