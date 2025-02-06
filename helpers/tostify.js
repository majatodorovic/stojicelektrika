import { toast } from "react-toastify";

export const openAlertBox = (message, type) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};
