"use client";

import { ReactEventHandler, SyntheticEvent, useState } from "react";
import styles from "./sign-up-form.module.css";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input";
import Button from "../button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(defaultValues);
  const { displayName, email, password, confirmPassword } = formValues;

  const resetFormFields = () => {
    setFormValues(defaultValues);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match!");
      return;
    }

    try {
      const { user }: any = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      toast.success("Sign up successfully");
      router.push("/shop");
      resetFormFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        console.log(error);
      }
    }
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles["sign-up-container"]}>
      <h2 className={styles.h2}>Dont have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button buttonType="inverted" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
