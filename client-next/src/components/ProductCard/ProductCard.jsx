import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductCard.module.css";
import { Delete } from "@mui/icons-material";

const classNames = getClassNames(styles);

export default function ProductCard({ product }) {
  return (
    <div className={classNames("container")}>
      <div>Hello</div>
      <div className={classNames("view-and-delete-btn-container")}>
        <div className={classNames("delete-btn")}>
          <Delete />
        </div>
        <p>10 views</p>
      </div>
    </div>
  );
}
