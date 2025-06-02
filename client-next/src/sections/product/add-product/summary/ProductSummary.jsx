"use client";

import Button from "@/components/Button/Button";
import { useProductForm } from "@/hooks/useProductForm";
import { getClassNames, punctualizeString } from "@/lib/utils/commonUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./ProductSummary.module.css";
import ProductInfo from "./ProductInfo";
import { useMutation } from "@apollo/client";
import {
  CREATE_PRODUCT,
  GET_OWNED_PRODUCTS_QUERY,
} from "@/actions/productActions";
import { showErrorToast } from "@/lib/utils/toastUtils";

const classNames = getClassNames(styles);

const priceFields = ["price", "rentalPrice", "rentDuration"];

export default function ProductSummary({}) {
  const router = useRouter();
  const { formData, resetForm } = useProductForm();
  const [addProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, { data }) {
      const { getProductsByOwner } = cache.readQuery({
        query: GET_OWNED_PRODUCTS_QUERY,
      });

      cache.writeQuery({
        query: GET_OWNED_PRODUCTS_QUERY,
        data: {
          getProductsByOwner: [data.createProduct, ...getProductsByOwner],
        },
      });
    },
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push("/");
  };

  const createProduct = async () => {
    const {
      title,
      categories,
      price,
      rentalPrice,
      rentDuration,
      ...productData
    } = formData;
    productData.name = title;
    if (price) {
      productData.price = new Number(price);
    }
    if (rentalPrice) {
      productData.rentalPrice = new Number(rentalPrice);
    }
    if (rentDuration) {
      productData.rentDuration = rentDuration;
    }
    try {
      await addProduct({
        variables: { data: productData, categoryNames: categories },
      });
      resetForm();
      handleNext();
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div className={classNames("container")}>
      <h1>Summary</h1>

      {Object.entries(formData)
        .filter(([key]) => !priceFields.includes(key))
        .map(([key, value]) => (
          <ProductInfo key={key} field={key} value={value} />
        ))}
      <div className={classNames("price-section")}>
        {formData?.price && <div>Price: ${formData.price}</div>}
        {formData?.rentalPrice && (
          <div>
            Rent: ${formData.rentalPrice} {formData.rentDuration}
          </div>
        )}
      </div>
      <div className={classNames("button-container")}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={createProduct}>Submit</Button>
      </div>
    </div>
  );
}
