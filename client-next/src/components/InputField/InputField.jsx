import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./InputField.module.css";
import Input from "@/components/Input/Input";

const classNames = getClassNames(styles);

export default function InputField({
  label,
  error,
  showError = true,
  className,
  ...inputProps
}) {
  return (
    <div className={classNames("input-field", className)}>
      <Input {...inputProps} error={error} />
      {error && showError && <div className={classNames("error")}>{error}</div>}
    </div>
  );
}
