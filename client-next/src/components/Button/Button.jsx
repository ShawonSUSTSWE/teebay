import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./Button.module.css";

const classNames = getClassNames(styles);

export default function Button({
  onClick,
  variant = "primary",
  className = "",
  children,
  loading = false,
  disabled = false,
}) {
  return (
    <button
      className={classNames(
        "button",
        variant,
        className,
        disabled && "disabled"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <div className={classNames("loading")}></div> : children}
    </button>
  );
}
