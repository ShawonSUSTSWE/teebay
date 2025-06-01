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
import { useState } from "react";
import { useRouter } from "next/navigation";

const classNames = getClassNames(styles);

export default function LoginSection() {
  const { register, getValues } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const hanleLogin = async (e) => {
    e.preventDefault();
    const data = getValues();
    let success = false;
    setLoading(true);
    try {
      const token = await login(data.email, data.password);
      success = true;
    } catch (error) {
      showErrorToast(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN IN" />
      <FormContainer className={classNames("form")}>
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
        <Button
          className={classNames("login-btn")}
          onClick={hanleLogin}
          loading={loading}
        >
          LOGIN
        </Button>
        <p className={classNames("signup-link")}>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}
