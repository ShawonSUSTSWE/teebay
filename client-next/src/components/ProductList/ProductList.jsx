import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";

const classNames = getClassNames(styles);

export default function ProductList({ products = [], ...props }) {
  return (
    <div className={classNames("container")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} {...props} />
      ))}
    </div>
  );
}
