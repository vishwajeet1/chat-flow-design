import { toast } from "react-toastify";

const useAlertMessage = () => {
  const alertMessage = (
    message: string,
    messageType?: "error" | "waring" | "success"
  ) => {
    if (messageType === "error") {
      toast.error(message);
    } else if (messageType === "success") {
      toast.success(message);
    } else {
      toast.warning(message);
    }
  };
  return { alertMessage };
};
export default useAlertMessage;
