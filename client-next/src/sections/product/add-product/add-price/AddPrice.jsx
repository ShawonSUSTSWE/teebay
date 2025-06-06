"use client";

import Button from "@/components/Button/Button";
import { useProductForm } from "@/hooks/useProductForm";
import {
  getClassNames,
  isEmptyString,
  isNumeric,
} from "@/lib/utils/commonUtils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AddPrice.module.css";
import InputField from "@/components/InputField/InputField";
import { FormHelperText } from "@mui/material";
import RentDuration from "@/lib/constants/RentDuration";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { routeToNextProductCreatePage } from "@/lib/utils/routeUtils";

const classNames = getClassNames(styles);

export default function AddPrice({}) {
  const router = useRouter();
  const pathname = usePathname();
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
    const nextRoute = routeToNextProductCreatePage(pathname);
    router.push(nextRoute);
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
        <CustomSelect
          label={"Duration"}
          labelId={"rent-duration-label"}
          value={rentDuration}
          setValue={setRentDuration}
          options={RentDuration}
        />
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
