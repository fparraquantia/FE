import { notification } from "antd";

const openNotification = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  description: string
) => {
  notification[type]({
    message: message,
    description: description,
    duration: 3,
  });
};

const ApiNotification = {
  success: (message: string, description: string) => {
    openNotification("success", message, description);
  },
  error: (message: string, description: string) => {
    openNotification("error", message, description);
  },
  info: (message: string, description: string) => {
    openNotification("info", message, description);
  },
  warning: (message: string, description: string) => {
    openNotification("warning", message, description);
  },
};

export default ApiNotification;
