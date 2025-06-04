"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductFeed.module.css";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProductList from "@/components/ProductList/ProductList";
import { useQuery } from "@apollo/client";
import { GET_AVAILABLE_PRODUCTS } from "@/actions/productActions";
import { showErrorToast } from "@/lib/utils/toastUtils";
import Loader from "@/components/Loader/Loader";

const classNames = getClassNames(styles);

export default function ProductFeed({}) {
  const { data, loading, error } = useQuery(GET_AVAILABLE_PRODUCTS);

  if (loading) return <Loader />;
  if (error) {
    showErrorToast(error.message);
    return null;
  }
  return (
    <div className={classNames("container")}>
      <SectionHeader header="ALL PRODUCTS" />
      <ProductList products={data?.getAllAvailableProducts} />
    </div>
  );
}
