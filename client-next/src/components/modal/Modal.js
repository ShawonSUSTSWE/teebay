import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./Modal.module.css";

const classNames = getClassNames(styles);

export default function Modal({ children, className, ref }) {
  return (
    <div className={classNames("overlay")}>
      <div className={classNames("modal", className)} ref={ref}>
        {children}
      </div>
    </div>
  );
}
