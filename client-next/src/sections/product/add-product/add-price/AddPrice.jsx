"use client";

import Button from "@/components/Button/Button";
import { useProductForm } from "@/hooks/useProductForm";
import { getClassNames, isEmptyString } from "@/lib/utils/commonUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AddPrice.module.css";
import Input from "@/components/Input/Input";
import InputField from "@/components/InputField/InputField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RentDuration from "@/lib/constants/RentDuration";

const classNames = getClassNames(styles);

export default function AddPrice({}) {
  const router = useRouter();
  const { formData, updateForm } = useProductForm();
  const [price, setPrice] = useState(formData.price || "");
  const [rentPrice, setRentPrice] = useState(formData.rentPrice || "");
  const [rentDuration, setRentDuration] = useState(formData.rentDuration || "");

  useEffect(() => {
    console.log({ formData });
    setPrice(formData.price);
  }, [formData]);

  const handleBack = () => {
    updateForm({ price, rentPrice, rentDuration });
    router.back();
  };

  const handleNext = () => {
    updateForm({ price, rentPrice, rentDuration });
    router.push("/add-product/description");
  };

  const isNextDisabled = !price && (!rentPrice || !rentDuration);

  return (
    <div className={classNames("container")}>
      <p>Select a price for your product</p>
      <Input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className={classNames("row")}>
        <InputField
          label={"Rent Price"}
          value={rentPrice}
          onChange={(e) => setRentPrice(e.target.value)}
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
      <div className={classNames("button-container")}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
}
