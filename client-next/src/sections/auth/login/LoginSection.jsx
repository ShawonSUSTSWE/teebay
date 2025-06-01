"use client";

import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./LoginSection.module.css";
import FormContainer from "@/components/FormContainer/FormContainer";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/actions/authActions";
import { showErrorToast, showSuccessToast } from "@/lib/utils/toastUtils";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginValidationRules } from "@/lib/utils/validationRules";
import InputField from "@/components/InputField/InputField";
import { useApolloClient } from "@apollo/client";

const classNames = getClassNames(styles);

export default function LoginSection() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const client = useApolloClient();

  const router = useRouter();

  const hanleLogin = async () => {
    const data = getValues();
    try {
      await login({ ...data });
    } catch (error) {
      showErrorToast(error.message || "Login failed");
      return;
    }
    router.push("/");
  };

  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN IN" />
      <FormContainer
        className={classNames("form")}
        onSubmit={handleSubmit(hanleLogin)}
      >
        <InputField
          error={errors?.email?.message}
          placeholder="Email"
          className={classNames("input")}
          {...register("email", loginValidationRules.email)}
        />
        <InputField
          error={errors?.password?.message}
          placeholder="Password"
          type="password"
          className={classNames("input")}
          {...register("password", loginValidationRules.password)}
        />
        <Button className={classNames("login-btn")}>LOGIN</Button>
        <p className={classNames("signup-link")}>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}
