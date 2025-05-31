import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./LoginSection.module.css";
import FormContainer from "@/components/FormContainer/FormContainer";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";

const classNames = getClassNames(styles);

export default function LoginSection() {
  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN IN" />
      <FormContainer className={classNames("form")}>
        <Input placeholder="Email" className={classNames("input")} />
        <Input
          placeholder="Password"
          type="password"
          className={classNames("input")}
        />
        <Button className={classNames("login-btn")}>LOGIN</Button>
        <p className={classNames("signup-link")}>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </FormContainer>
    </div>
  );
}
