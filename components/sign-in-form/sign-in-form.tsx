"use client";

import { SyntheticEvent, useState } from "react";
import styles from "./sign-in.module.css";
import { toast } from "react-hot-toast";

import {
  sigInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input";
import Button from "../button";
import { useRouter } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const router = useRouter();
  const { email, password } = formValues;

  const resetFormFields = () => {
    setFormValues(defaultValues);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      toast.success("Signed in successfully");
      router.push("/shop");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const data: any = await sigInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (data.uid !== null) {
        toast.success("Signed in successfully");
        router.push("/shop");
      }

      resetFormFields();
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("incorrect password");
          break;
        case "auth/user-not-found":
          toast.error("user not found with this email");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles["sign-up-container"]}>
      <h2 className={styles.h2}>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />

        <div className={styles["buttons-container"]}>
          <Button buttonType="inverted" type="submit">
            Sign In
          </Button>
          <div className={styles.googleBtn}>
            <Button
              type="button"
              buttonType="google"
              onClick={signInWithGoogle}
              style={{ width: "100%" }}
            >
              Google Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
