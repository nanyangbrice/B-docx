import Toast from 'react-native-toast-message';

export const ToastService = {
    
    showError: (title, message, position) => {
        Toast.show({
            type: 'error',
            text1: title,
            text2: message,
            position: position,
        });
    },

    showSuccess: (title, message, position) => {
        Toast.show({
            type: 'success',
            text1: title,
            text2: message,
            position: position,
            position: 'top',
        });
    },

    close: () => {
        Toast.hide();
    }
};