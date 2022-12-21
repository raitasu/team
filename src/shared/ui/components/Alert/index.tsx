import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertTitle,
  Box,
  CloseButton
} from '@chakra-ui/react';
import {
  MdClose,
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline
} from 'react-icons/md';

import { AlertStyles as styles } from './alert.styles';
import { type BaseAlertProps } from './alert.types';

const getAlertIcon = (status: BaseAlertProps['status']) => {
  switch (status) {
    case 'error':
      return (
        <Box color="brand.accentRed">
          <MdOutlineErrorOutline size="25px" />
        </Box>
      );
    case 'success':
      return (
        <Box color="brand.accentGreen">
          <MdOutlineCheckCircleOutline size="25px" />
        </Box>
      );
    default:
      return null;
  }
};

export const Alert = ({
  status,
  variant,
  message = 'This is a description',
  onClose,
  heading,
  ...passThroughProps
}: BaseAlertProps) => (
  <ChakraAlert
    {...passThroughProps}
    status={status}
    variant={variant}
    sx={status ? styles[status] : undefined}
  >
    {getAlertIcon(status)}
    <Box>
      {heading ? <AlertTitle>{heading}</AlertTitle> : null}
      <AlertDescription>{message}</AlertDescription>
    </Box>
    {onClose && (
      <CloseButton
        ml="auto"
        onClick={onClose}
        sx={
          variant === 'toast'
            ? {
                color: 'brand.headline2',
                boxSize: '24px'
              }
            : {
                color: 'brand.ghostGray',
                boxSize: '32px'
              }
        }
      >
        <MdClose size={variant === 'toast' ? '24px' : '32px'} />
      </CloseButton>
    )}
  </ChakraAlert>
);
