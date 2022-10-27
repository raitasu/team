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
import { BaseAlertProps } from './alert.types';

const getAlertIcon = (status: BaseAlertProps['status']) => {
  switch (status) {
    case 'error':
      return (
        <Box color="brand.accentRed">
          <MdOutlineErrorOutline size="20px" />
        </Box>
      );
    case 'success':
      return (
        <Box color="brand.accentGreen">
          <MdOutlineCheckCircleOutline size="20px" />
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
    <CloseButton
      boxSize="19px"
      ml="auto"
      onClick={onClose}
      color="brand.ghostGray"
    >
      <MdClose size="19px" />
    </CloseButton>
  </ChakraAlert>
);
