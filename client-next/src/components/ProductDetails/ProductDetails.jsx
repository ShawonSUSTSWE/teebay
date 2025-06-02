import {
  formatDateToLocaleString,
  getClassNames,
} from "@/lib/utils/commonUtils";
import styles from "./ProductDetails.module.css";

const classNames = getClassNames(styles);

export default function ProductDetails({
  name,
  categories,
  price,
  description,
  rentalPrice,
  rentDuration,
  createdAt,
}) {
  return (
    <div className={classNames("product-details")}>
      <h3>{name}</h3>
      <p className={classNames("categories")}>
        <strong>Categories:</strong>{" "}
        {categories?.map((cat) => cat.name.toLowerCase()).join(", ")}
      </p>
      <p>
        {price && (
          <>
            <strong>Price:</strong> ${price}
          </>
        )}
        {price && rentalPrice && " | "}
        {rentalPrice && (
          <>
            <strong>Rent:</strong> ${rentalPrice} {rentDuration?.toLowerCase()}
          </>
        )}
      </p>
      <p>{description}</p>
      {createdAt && (
        <p>Date posted: {formatDateToLocaleString(new Date(createdAt))}</p>
      )}
    </div>
  );
}
