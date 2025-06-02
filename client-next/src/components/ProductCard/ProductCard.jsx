import {
  formatDateToLocaleString,
  getClassNames,
} from "@/lib/utils/commonUtils";
import styles from "./ProductCard.module.css";
import { Delete } from "@mui/icons-material";
import Link from "next/link";
import { PageRoutes } from "@/lib/utils/routeUtils";
import ProductDetails from "../ProductDetails/ProductDetails";

const classNames = getClassNames(styles);

export default function ProductCard({
  product,
  deleteProduct = () => {},
  isOwned = false,
}) {
  return (
    <Link href={PageRoutes.productDetailsPage(product.id)}>
      <div className={classNames("container")}>
        <ProductDetails {...product} />
        <div className={classNames("view-and-delete-btn-container")}>
          {isOwned ? (
            <div
              className={classNames("delete-btn")}
              onClick={() => deleteProduct(product.id)}
            >
              <Delete />
            </div>
          ) : (
            <div></div>
          )}
          <p className={classNames("view-count")}>10 views</p>
        </div>
      </div>
    </Link>
  );
}
