import { type ToastProps, useToast } from '@chakra-ui/react';

import { Alert } from '~/shared/ui/components/Alert';

const errorConfig: ToastProps = {
  isClosable: true,
  render: ({ onClose, description, title }) => (
    <Alert
      heading={title}
      message={description}
      status="error"
      onClose={onClose}
    />
  )
};

const successConfig: ToastProps = {
  isClosable: true,
  render: ({ onClose, description, title }) => (
    <Alert
      heading={title}
      message={description}
      status="success"
      onClose={onClose}
    />
  )
};

export const useErrorToast = (config?: ToastProps) =>
  useToast({ ...config, ...errorConfig, duration: config?.duration || 5000 });

export const useSuccessToast = (config?: ToastProps) =>
  useToast({ ...config, ...successConfig, duration: config?.duration || 5000 });
