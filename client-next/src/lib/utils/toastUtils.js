import { toast } from "react-toastify";

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showSuccessToast = (message) => {
  toast.success(message);
};
