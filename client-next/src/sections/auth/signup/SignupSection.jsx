"use client";

import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./SignupSection.module.css";
import FormContainer from "@/components/FormContainer/FormContainer";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputField from "@/components/InputField/InputField";
import { signupValidationRules } from "@/lib/utils/validationRules";

const classNames = getClassNames(styles);

export default function SignupSection() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleSignup = async () => {
    const data = getValues();
    console.log(data);
    // try {
    //   const token = await login(data.email, data.password);
    //   console.log(token);
    // } catch (error) {
    //   showErrorToast(error.message || "Login failed");
    //   return;
    // }
  };

  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN UP" />
      <FormContainer
        className={classNames("form")}
        onSubmit={handleSubmit(handleSignup)}
      >
        <div className={classNames("row")}>
          <InputField
            error={errors?.firstName?.message}
            placeholder="First Name"
            {...register("firstName", signupValidationRules.firstName)}
          />
          <InputField
            error={errors?.lastName?.message}
            placeholder="Last Name"
            {...register("lastName", signupValidationRules.lastName)}
          />
        </div>
        <InputField
          error={errors?.address?.message}
          placeholder="Address"
          className={classNames("input")}
          {...register("address", signupValidationRules.address)}
        />
        <div className={classNames("row")}>
          <InputField
            error={errors?.email?.message}
            placeholder="Email"
            {...register("email", signupValidationRules.email)}
          />
          <InputField
            error={errors?.phoneNumber?.message}
            placeholder="Phone Number"
            {...register("phoneNumber", signupValidationRules.phoneNumber)}
          />
        </div>
        <InputField
          error={errors?.password?.message}
          placeholder="Password"
          type="password"
          className={classNames("input")}
          {...register("password", signupValidationRules.password)}
        />
        <InputField
          error={errors?.confirmPassword?.message}
          placeholder="Confirm Password"
          type="password"
          className={classNames("input")}
          {...register(
            "confirmPassword",
            signupValidationRules.confirmPassword(getValues)
          )}
        />
        <Button className={classNames("login-btn")}>REGISTER</Button>
        <p className={classNames("signup-link")}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </FormContainer>
    </div>
  );
}
