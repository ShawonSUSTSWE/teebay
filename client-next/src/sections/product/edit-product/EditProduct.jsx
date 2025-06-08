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

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;

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
    product.title.trim() &&
    product.description.trim() &&
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
            name: product.title.trim(),
            description: product.description.trim(),
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
        name="title"
        label="Title"
        value={product.title}
        onChange={handleChange}
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
          name="description"
          className={classNames("custom-textarea")}
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className={classNames("row-container")}>
        <InputField
          name="price"
          label="Price"
          value={product.price}
          onChange={handleChange}
          error={!!errors.price}
          showError={false}
        />
        <InputField
          name="rentalPrice"
          label="Rent Price"
          value={product.rentalPrice}
          onChange={handleChange}
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
