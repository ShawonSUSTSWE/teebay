import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./layout.css";

const classNames = getClassNames(styles);

export default function AddProductLayout({ children }) {
  return (
    <main className={classNames("add-product-layout")}>
      <div className={classNames("add-product-container")}>
        <h1 className={classNames("add-product-title")}>Create Product</h1>
        {children}
      </div>
    </main>
  );
}
