import {
  createStandaloneToast,
  type ToastProps,
  useToast
} from '@chakra-ui/react';
import { type TOptions } from 'i18next';
import { getI18n } from 'react-i18next';

import type en from '~/services/i18n/locales/en.json';
import { Alert } from '~/shared/ui/components/Alert';

const errorConfig: ToastProps = {
  isClosable: true,
  render: ({ onClose, description, title, variant }) => (
    <Alert
      heading={title}
      message={description}
      status="error"
      onClose={onClose}
      variant={variant}
    />
  )
};

const successConfig: ToastProps = {
  isClosable: true,
  render: ({ onClose, description, title, variant }) => (
    <Alert
      heading={title}
      message={description}
      status="success"
      onClose={onClose}
      variant={variant}
    />
  )
};

const { toast: globalErrorToast } = createStandaloneToast();

export const useErrorToast = (config?: ToastProps) =>
  useToast({ ...config, ...errorConfig, duration: config?.duration || 5000 });

export const useSuccessToast = (config?: ToastProps) =>
  useToast({ ...config, ...successConfig, duration: config?.duration || 5000 });

export const showGlobalError = (
  config?: Omit<ToastProps, 'description' | 'title'> & {
    titleTag?: keyof typeof en['domains']['global']['errors']['titles'];
    titleTagArgs?: TOptions;
    descriptionTag?: keyof typeof en['domains']['global']['errors']['descriptions'];
    descriptionTagArgs?: TOptions;
  }
) =>
  globalErrorToast({
    ...errorConfig,
    ...config,
    title: getI18n().t(
      `domains:global.errors.titles.${config?.titleTag ?? 'unknown_error'}`,
      config?.titleTagArgs || {}
    ),
    description: getI18n().t(
      `domains:global.errors.descriptions.${
        config?.descriptionTag ?? 'unknown_error'
      }`,
      config?.descriptionTagArgs || {}
    ),
    position: config?.position ?? 'bottom-right',
    duration: config?.duration ?? 5000,
    isClosable: config?.isClosable ?? true
  });
