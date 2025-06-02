import { useEffect, useState } from "react";

const STORAGE_KEY = "addProductFormData";

const defaultFormData = {
  title: "",
  categories: [],
  description: "",
  price: "",
  rentPrice: "",
  rentDuration: "",
};

export function useProductForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid localStorage data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const updateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
  };

  return { formData, updateForm, resetForm };
}
