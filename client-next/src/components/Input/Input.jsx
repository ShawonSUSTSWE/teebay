import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./Input.module.css";

const classNames = getClassNames(styles);

export default function Input({
  className,
  endActionButton = null,
  error = false,
  ...props
}) {
  return (
    <div className={classNames("input", className, error && "error")}>
      <input {...props} />
      {endActionButton}
    </div>
  );
}
