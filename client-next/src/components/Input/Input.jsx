import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./Input.module.css";

const classNames = getClassNames(styles);

export default function Input({ className, endActionButton = null, ...props }) {
  return (
    <div className={classNames("input", className, props.error && "error")}>
      <input {...props} />
      {endActionButton}
    </div>
  );
}
