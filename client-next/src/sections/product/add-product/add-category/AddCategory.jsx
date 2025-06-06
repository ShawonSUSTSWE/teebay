"use client";

import { getClassNames, isEmptyArray } from "@/lib/utils/commonUtils";
import styles from "./AddCategory.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useProductForm } from "@/hooks/useProductForm";
import { useEffect, useState } from "react";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Button from "@/components/Button/Button";
import { routeToNextProductCreatePage } from "@/lib/utils/routeUtils";
import Categories from "@/lib/constants/Categories";

const classNames = getClassNames(styles);

export default function AddCategory({}) {
  const router = useRouter();
  const pathname = usePathname();
  const { formData, updateForm } = useProductForm();
  const [categories, setCategories] = useState(formData.categories || []);

  useEffect(() => {
    setCategories(formData.categories);
  }, [formData]);

  const handleBack = () => {
    updateForm({ categories });
    router.back();
  };

  const handleNext = () => {
    updateForm({ categories });
    const nextRoute = routeToNextProductCreatePage(pathname);
    router.push(nextRoute);
  };

  return (
    <div className={classNames("container")}>
      <p>Select a category for your product</p>
      <MultiSelect
        selected={categories}
        setSelected={setCategories}
        options={Object.keys(Categories)}
      />
      <div className={classNames("button-container")}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext} disabled={isEmptyArray(categories)}>
          Next
        </Button>
      </div>
    </div>
  );
}
