"use client";

import { getClassNames, isEmptyArray } from "@/lib/utils/commonUtils";
import styles from "./AddCategory.module.css";
import { useRouter } from "next/navigation";
import { useProductForm } from "@/hooks/useProductForm";
import { useEffect, useState } from "react";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Button from "@/components/Button/Button";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "@/actions/categoryActions";
import Loader from "@/components/Loader/Loader";

const classNames = getClassNames(styles);

export default function AddCategory({}) {
  const router = useRouter();
  const { formData, updateForm } = useProductForm();
  const [categories, setCategories] = useState(formData.categories || []);
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setCategories(formData.categories);
  }, [formData]);

  const handleBack = () => {
    updateForm({ categories });
    router.back();
  };

  const handleNext = () => {
    updateForm({ categories });
    router.push("/add-product/summary");
  };

  return (
    <div className={classNames("container")}>
      <p>Select a category for your product</p>
      {loading ? (
        <Loader />
      ) : (
        <MultiSelect
          selected={categories}
          setSelected={setCategories}
          options={data.getAllCategories.map(({ name }) => name)}
        />
      )}
      <div className={classNames("button-container")}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext} disabled={isEmptyArray(categories)}>
          Next
        </Button>
      </div>
    </div>
  );
}
