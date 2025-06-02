"use client";

import Button from "@/components/Button/Button";
import { useProductForm } from "@/hooks/useProductForm";
import { getClassNames, isEmptyString } from "@/lib/utils/commonUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AddPrice.module.css";
import Input from "@/components/Input/Input";
import InputField from "@/components/InputField/InputField";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import RentDuration from "@/lib/constants/RentDuration";

const classNames = getClassNames(styles);

const isNumeric = (value) => /^\d*\.?\d*$/.test(value);

export default function AddPrice({}) {
  const router = useRouter();
  const { formData, updateForm } = useProductForm();
  const [price, setPrice] = useState(formData.price || "");
  const [rentalPrice, setRentalPrice] = useState(formData.rentalPrice || "");
  const [rentDuration, setRentDuration] = useState(formData.rentDuration || "");
  const [priceError, setPriceError] = useState("");
  const [rentalPriceError, setRentalPriceError] = useState("");

  useEffect(() => {
    setPrice(formData.price);
    setRentalPrice(formData.rentalPrice);
    setRentDuration(formData.rentDuration);
  }, [formData]);

  const handleBack = () => {
    updateForm({ price, rentalPrice, rentDuration });
    router.back();
  };

  const handleNext = () => {
    updateForm({ price, rentalPrice, rentDuration });
    router.push("/add-product/categories");
  };

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

  const hasPrice = !isEmptyString(price);
  const hasRentalPrice = !isEmptyString(rentalPrice);
  const hasRentDuration = !isEmptyString(rentDuration);

  const isNextDisabled =
    !(
      (hasPrice && !hasRentalPrice && !hasRentDuration) ||
      (hasRentalPrice && hasRentDuration)
    ) ||
    priceError ||
    rentalPriceError;

  return (
    <div className={classNames("container")}>
      <p>Select a price for your product</p>
      <InputField
        value={price}
        onChange={handlePriceChange}
        error={!!priceError}
      />
      {priceError && <FormHelperText error>{priceError}</FormHelperText>}
      <div className={classNames("row")}>
        <InputField
          label={"Rent Price"}
          value={rentalPrice}
          onChange={handleRentalPriceChange}
          error={!!rentalPriceError}
          showError={false}
        />
        <FormControl fullWidth>
          <InputLabel id="rent-duration-label">Duration</InputLabel>
          <Select
            labelId="rent-duration-label"
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
            size="small"
          >
            {Object.entries(RentDuration).map(([key, value]) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {rentalPriceError && (
        <FormHelperText error>{rentalPriceError}</FormHelperText>
      )}
      <div className={classNames("button-container")}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
}
