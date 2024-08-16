import SignInForm from "../sign-in-form/sign-in-form";
import SignUpForm from "../sign-up-form/sign-up";
import styles from "./authentication.module.css";

const Authentication = () => {
  return (
    <div className={styles["authentication-container"]}>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
