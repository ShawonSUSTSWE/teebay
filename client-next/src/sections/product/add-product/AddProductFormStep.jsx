"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useProductForm } from "@/hooks/useProductForm";
import { getClassNames, isEmptyString } from "@/lib/utils/commonUtils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AddProductFormStep.module.css";
import { routeToNextProductCreatePage } from "@/lib/utils/routeUtils";

const classNames = getClassNames(styles);

export default function AddProductFormStep({
  promptText,
  fieldKey,
  inputType = "text",
  showBackButton = true,
  validateNext = isEmptyString,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { formData, updateForm } = useProductForm();
  const [fieldValue, setFieldValue] = useState(formData[fieldKey] || "");

  useEffect(() => {
    setFieldValue(formData[fieldKey]);
  }, [formData, fieldKey]);

  const handleBack = () => {
    updateForm({ [fieldKey]: fieldValue.trim() });
    router.back();
  };

  const handleNext = () => {
    updateForm({ [fieldKey]: fieldValue.trim() });
    const nextRoute = routeToNextProductCreatePage(pathname);
    router.push(nextRoute);
  };

  const InputComponent = inputType === "textarea" ? "textarea" : Input;

  return (
    <div className={classNames("container")}>
      <p>{promptText}</p>
      {InputComponent === "textarea" ? (
        <textarea
          className={classNames("custom-textarea")}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      ) : (
        <InputComponent
          type={inputType}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      )}
      <div className={classNames("button-container")}>
        {showBackButton ? (
          <Button onClick={handleBack}>Back</Button>
        ) : (
          <div></div>
        )}
        <Button onClick={handleNext} disabled={validateNext(fieldValue.trim())}>
          Next
        </Button>
      </div>
    </div>
  );
}
