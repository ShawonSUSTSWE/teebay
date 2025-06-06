"use client";

import Loader from "@/components/Loader/Loader";
import {
  extractFieldFromObjectArray,
  getClassNames,
  isEmptyArray,
  isEmptyString,
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
import { showErrorToast } from "@/lib/utils/toastUtils";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import Categories from "@/lib/constants/Categories";

const classNames = getClassNames(styles);

export default function EditProduct({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [priceError, setPriceError] = useState("");
  const [rentalPriceError, setRentalPriceError] = useState("");

  const productData = data?.getProductById;

  useEffect(() => {
    if (productData) {
      const {
        name,
        categories,
        description,
        price,
        rentalPrice,
        rentDuration,
      } = productData;
      setTitle(name);
      setSelected(categories);
      setDescription(description);
      setPrice(price ?? "");
      setRentalPrice(rentalPrice ?? "");
      setRentDuration(rentDuration ?? "");
    }
  }, [productData]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPrice(value);
      setPriceError("");
    } else {
      setPrice(value);
      setPriceError("Only numeric values are allowed");
    }
  };

  const handleRentalPriceChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setRentalPrice(value);
      setRentalPriceError("");
    } else {
      setRentalPrice(value);
      setRentalPriceError("Only numeric values are allowed");
    }
  };

  const submitDataForEdit = async () => {
    const updatedProductData = {
      name: title,
      description,
      price: price ? Number(price) : null,
      rentalPrice: rentalPrice ? Number(rentalPrice) : null,
      rentDuration: rentDuration ? rentDuration : null,
    };
    try {
      await updateProductMutation({
        variables: {
          id: id,
          data: updatedProductData,
          categoryNames: selected,
        },
      });
      router.push("/");
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const hasPrice = !isEmptyString(price);
  const hasRentalPrice = !isEmptyString(rentalPrice);
  const hasRentDuration = !isEmptyString(rentDuration);

  const isEditValid =
    !title ||
    !description ||
    isEmptyArray(selected) ||
    !(
      (hasPrice && !hasRentalPrice && !hasRentDuration) ||
      (hasRentalPrice && hasRentDuration)
    ) ||
    priceError ||
    rentalPriceError;

  if (loading) return <Loader />;

  if (error) return null;

  return (
    <div className={classNames("container")}>
      <InputField
        label={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={classNames("categories-container")}>
        <label>Categories</label>
        <MultiSelect
          options={Object.keys(Categories)}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className={classNames("categories-container")}>
        <label>Description</label>
        <textarea
          className={classNames("custom-textarea")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={classNames("row-container")}>
        <InputField
          label={"Price"}
          value={price}
          onChange={handlePriceChange}
          error={!!priceError}
          showError={false}
        />
        <InputField
          label={"Rent Price"}
          value={rentalPrice}
          onChange={handleRentalPriceChange}
          error={!!rentalPriceError}
          showError={false}
        />
        <CustomSelect
          label={"Duration"}
          labelId={"rent-duration-label"}
          value={rentDuration}
          setValue={setRentDuration}
          options={RentDuration}
        />
      </div>
      <div>
        {priceError || rentalPriceError ? (
          <FormHelperText error>
            {priceError || rentalPriceError}
          </FormHelperText>
        ) : null}
      </div>
      <Button
        className={classNames("edit-button")}
        disabled={isEditValid}
        onClick={submitDataForEdit}
      >
        Edit Product
      </Button>
    </div>
  );
}
