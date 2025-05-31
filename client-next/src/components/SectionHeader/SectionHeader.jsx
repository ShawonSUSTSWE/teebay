import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./SectionHeader.module.css";

const classNames = getClassNames(styles);

export default function SectionHeader({ header = "" }) {
  return <h3 className={classNames("section-header")}>{header}</h3>;
}
