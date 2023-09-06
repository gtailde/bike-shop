import { toast, type Theme } from 'react-toastify';

export const successNotify = (message: string, theme: Theme = 'dark') => {
  toast.success(message, {
    theme,
  });
};

export const errorNotify = (message: string, theme: Theme = 'dark') => {
  toast.error(message, {
    theme,
  });
};
