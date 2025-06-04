"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductDetailsSection.module.css";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAILS } from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { PageRoutes } from "@/lib/utils/routeUtils";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const classNames = getClassNames(styles);

export default function ProductDetailsSection({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const router = useRouter();

  if (loading) return <Loader />;

  if (error) return null;

  const productData = data?.getProductById;

  const routeToEditPage = () => {
    const page = PageRoutes.productEditPage(productData.id);
    console.log({ page });
    router.push(page);
  };

  return (
    <div className={classNames("wrapper")}>
      <div className={classNames("container")}>
        <ProductDetails {...productData} />
        <div className={classNames("button-container")}>
          <Button onClick={routeToEditPage}>Edit Product</Button>
        </div>
      </div>
    </div>
  );
}
