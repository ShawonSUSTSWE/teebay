"use client";

import Loader from "@/components/Loader/Loader";
import {
  getClassNames,
  isEmptyArray,
  isNumeric,
} from "@/lib/utils/commonUtils";
import { useMutation, useQuery } from "@apollo/client";
import styles from "./EditProduct.module.css";
import { GET_PRODUCT_DETAILS, UPDATE_PRODUCT } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import { useEffect, useState } from "react";
import { FormHelperText } from "@mui/material";
import RentDuration from "@/lib/constants/RentDuration";
import Button from "@/components/Button/Button";
import { showErrorToast, showSuccessToast } from "@/lib/utils/toastUtils";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import Categories from "@/lib/constants/Categories";
import { PageRoutes } from "@/lib/utils/routeUtils";

const classNames = getClassNames(styles);

export default function EditProduct({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    rentalPrice: "",
    rentDuration: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({ price: "", rentalPrice: "" });

  useEffect(() => {
    if (data?.getProductById) {
      const {
        name,
        categories,
        description,
        price,
        rentalPrice,
        rentDuration,
      } = data.getProductById;
      setProduct({
        title: name,
        description,
        price: price ?? "",
        rentalPrice: rentalPrice ?? "",
        rentDuration: rentDuration ?? "",
      });
      setCategories(categories);
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setProduct((prev) => ({ ...prev, [field]: value }));

    if (field === "price") {
      setErrors((prev) => ({
        ...prev,
        price: isNumeric(value) ? "" : "Only numeric values are allowed",
      }));
    } else if (field === "rentalPrice") {
      setErrors((prev) => ({
        ...prev,
        rentalPrice: isNumeric(value) ? "" : "Only numeric values are allowed",
      }));
    }
  };

  const isValid =
    product.title &&
    product.description &&
    !isEmptyArray(categories) &&
    ((product.price && !product.rentalPrice && !product.rentDuration) ||
      (product.rentalPrice && product.rentDuration)) &&
    !errors.price &&
    !errors.rentalPrice;

  const submitDataForEdit = async () => {
    try {
      await updateProductMutation({
        variables: {
          id,
          data: {
            name: product.title,
            description: product.description,
            price: product.price ? Number(product.price) : null,
            rentalPrice: product.rentalPrice
              ? Number(product.rentalPrice)
              : null,
            rentDuration: product.rentDuration || null,
          },
          categoryNames: categories,
        },
      });
      showSuccessToast("Product Edited Successfully");
      router.push(PageRoutes.home);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return null;

  return (
    <div className={classNames("container")}>
      <InputField
        label="Title"
        value={product.title}
        onChange={handleChange("title")}
      />

      <div className={classNames("categories-container")}>
        <label>Categories</label>
        <MultiSelect
          options={Object.keys(Categories)}
          selected={categories}
          setSelected={setCategories}
        />
      </div>

      <div className={classNames("categories-container")}>
        <label>Description</label>
        <textarea
          className={classNames("custom-textarea")}
          value={product.description}
          onChange={handleChange("description")}
        />
      </div>

      <div className={classNames("row-container")}>
        <InputField
          label="Price"
          value={product.price}
          onChange={handleChange("price")}
          error={!!errors.price}
          showError={false}
        />
        <InputField
          label="Rent Price"
          value={product.rentalPrice}
          onChange={handleChange("rentalPrice")}
          error={!!errors.rentalPrice}
          showError={false}
        />
        <CustomSelect
          label="Duration"
          labelId="rent-duration-label"
          value={product.rentDuration}
          setValue={(value) =>
            setProduct((prev) => ({ ...prev, rentDuration: value }))
          }
          options={RentDuration}
          clearable
        />
      </div>

      {(errors.price || errors.rentalPrice) && (
        <FormHelperText error>
          {errors.price || errors.rentalPrice}
        </FormHelperText>
      )}

      <Button
        className={classNames("edit-button")}
        disabled={!isValid}
        onClick={submitDataForEdit}
      >
        Edit Product
      </Button>
    </div>
  );
}
