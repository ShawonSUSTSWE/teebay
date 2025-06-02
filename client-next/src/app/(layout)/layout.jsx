import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./layout.module.css";

const classNames = getClassNames(styles);

export default async function ProductLayout({ children }) {
  return <div className={classNames("container")}>{children}</div>;
}
