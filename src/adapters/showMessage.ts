import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  sccsess: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  dismiss: () => toast.dismiss(),
  info: (msg: string) => toast.info(msg),
  confirm: (
    data: string,
    onClosing: (confirmation: boolean | string) => void,
  ) => {
    toast(Dialog, {
      data,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      // onClose: consfirmation => {
      //   if (consfirmation) return onClosing(consfirmation);
      //   return onClosing(false);
      // },

      onClose: consfirmation => {
        if (consfirmation) {
          onClosing(consfirmation);
        } else {
          onClosing(false);
        }
      },
    });
  },
};
