import {
  formatDateToLocaleString,
  getClassNames,
} from "@/lib/utils/commonUtils";
import styles from "./ProductCard.module.css";
import { Delete } from "@mui/icons-material";

const classNames = getClassNames(styles);

export default function ProductCard({ product, deleteProduct = () => {} }) {
  return (
    <div className={classNames("container")}>
      <div className={classNames("product-details")}>
        <h3>{product.name}</h3>
        <p className={classNames("categories")}>
          <strong>Categories:</strong>{" "}
          {product.categories?.map((cat) => cat.name.toLowerCase()).join(", ")}
        </p>
        <p>
          {product.price && (
            <>
              <strong>Price:</strong> ${product.price}
            </>
          )}
          {product.price && product.rentalPrice && " | "}
          {product.rentalPrice && (
            <>
              <strong>Rent:</strong> ${product.rentalPrice}{" "}
              {product.rentDuration?.toLowerCase()}
            </>
          )}
        </p>
        <p>{product.description}</p>
        <p>
          Date posted: {formatDateToLocaleString(new Date(product.createdAt))}
        </p>
      </div>
      <div className={classNames("view-and-delete-btn-container")}>
        <div
          className={classNames("delete-btn")}
          onClick={() => deleteProduct(product.id)}
        >
          <Delete />
        </div>
        <p>10 views</p>
      </div>
    </div>
  );
}
