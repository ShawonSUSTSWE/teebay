import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./FormContainer.module.css";

const classNames = getClassNames(styles);

export default function FormContainer({ children, className = "", onSubmit }) {
  return (
    <form className={classNames("container", className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
