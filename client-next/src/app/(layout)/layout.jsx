import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

const classNames = getClassNames(styles);

export default async function ProductLayout({ children }) {
  return (
    <div className={classNames("container")}>
      <Navbar />
      {children}
    </div>
  );
}
