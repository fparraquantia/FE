import { notification } from "antd";

const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    duration: 3,
  });
};

const ApiNotification = {
  success: (message, description) => {
    openNotification("success", message, description);
  },
  error: (message, description) => {
    openNotification("error", message, description);
  },
  info: (message, description) => {
    openNotification("info", message, description);
  },
  warning: (message, description) => {
    openNotification("warning", message, description);
  },
};

export default ApiNotification;
