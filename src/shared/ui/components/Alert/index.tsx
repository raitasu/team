import { AlertProps } from '@chakra-ui/alert';
import {
  Alert as ChakraAlert,
  AlertDescription,
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

export const Alert = ({
  status,
  variant,
  message = 'This is a description',
  onClose,
  ...passThroughProps
}: AlertProps & BaseAlertProps) => (
  <ChakraAlert
    {...passThroughProps}
    status={status}
    variant={variant}
    sx={
      status === 'error'
        ? { ...styles.container, ...styles.error }
        : { ...styles.container, ...styles.success }
    }
  >
    {status === 'error' ? (
      <Box color="brand.red500">
        <MdOutlineErrorOutline size="20px" />
      </Box>
    ) : (
      <Box color="brand.accentGreen">
        <MdOutlineCheckCircleOutline size="20px" />
      </Box>
    )}
    <AlertDescription sx={styles.description}>{message}</AlertDescription>
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
