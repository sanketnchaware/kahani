import { toast } from "react-toastify";

export const showToastMessage = (message, type) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
    });
  } else {
    toast.success(message, {
      position: "top-right",
    });
  }
};
