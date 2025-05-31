import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./SignupSection.module.css";
import FormContainer from "@/components/FormContainer/FormContainer";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";

const classNames = getClassNames(styles);

export default function SignupSection() {
  return (
    <div className={classNames("container")}>
      <SectionHeader header="SIGN UP" />
      <FormContainer className={classNames("form")}>
        <div className={classNames("row")}>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </div>
        <Input placeholder="Address" className={classNames("input")} />
        <div className={classNames("row")}>
          <Input placeholder="Email" />
          <Input placeholder="Phone Number" />
        </div>
        <Input
          placeholder="Password"
          type="password"
          className={classNames("input")}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          className={classNames("input")}
        />
        <Button className={classNames("login-btn")}>REGISTER</Button>
        <p className={classNames("signup-link")}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </FormContainer>
    </div>
  );
}
