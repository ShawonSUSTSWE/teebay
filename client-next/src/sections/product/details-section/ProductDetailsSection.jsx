"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductDetailsSection.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAILS } from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const classNames = getClassNames(styles);

export default function ProductDetailsSection({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });

  if (loading) return <Loader />;

  if (error) return null;

  const productData = data?.getProductById;
  return (
    <div className={classNames("wrapper")}>
      <div className={classNames("container")}>
        <ProductDetails {...productData} />
      </div>
    </div>
  );
}
