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

const classNames = getClassNames(styles);

export default function LoginSection() {
  const { register, getValues } = useForm();

  const router = useRouter();

  const hanleLogin = async (e) => {
    e.preventDefault();
    const data = getValues();
    console.log(data);
    try {
      const token = await login(data.email, data.password);
      console.log(token);
    } catch (error) {
      showErrorToast(error.message || "Login failed");
      return;
    }
    router.push("/");
  };

  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN IN" />
      <FormContainer className={classNames("form")} onSubmit={hanleLogin}>
        <Input
          placeholder="Email"
          className={classNames("input")}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <Input
          placeholder="Password"
          type="password"
          className={classNames("input")}
          {...register("password", {
            required: true,
          })}
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
