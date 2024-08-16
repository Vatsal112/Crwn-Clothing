import classNames from "@/utils/classNames";
import styles from "./button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

const BUTTON_TYPES = {
  inverted: "inverted",
  google: "google-sign-in",
};

type ButtonType = keyof typeof BUTTON_TYPES;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonType: ButtonType;
}

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles[BUTTON_TYPES[buttonType]],
        styles["button-container"]
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
