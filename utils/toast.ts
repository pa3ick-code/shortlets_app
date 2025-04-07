
import Toast from "react-native-toast-message";

  export const showToast = (type: string, title: string, message: string, delay?: number) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      visibilityTime: delay || 3000,
    });
  };