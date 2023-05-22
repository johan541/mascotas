import { toast, ToastOptions, UpdateOptions } from 'react-toastify';

import styles from '@/styles/elements/toast.module.scss';

export function getToastConfig(position = toast.POSITION.BOTTOM_RIGHT): ToastOptions {
  return {
    position,
    className: styles.toast,
    theme: 'light',
  } as const;
}

export function getToastUpdateConfig(
  type: UpdateOptions['type'],
  rest?: UpdateOptions
): UpdateOptions {
  return {
    type,
    isLoading: false,
    autoClose: 8000,
    closeButton: null,
    ...rest,
  } as const;
}
