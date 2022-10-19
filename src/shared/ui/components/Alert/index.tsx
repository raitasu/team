import { AlertProps } from '@chakra-ui/alert';
import { Alert, AlertDescription, Box, CloseButton } from '@chakra-ui/react';
import {
  MdClose,
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline
} from 'react-icons/md';

import { AlertStyles as styles } from './alert.styles';
import { BaseAlertProps } from './alert.types';

export const BaseAlert = ({
  status,
  variant,
  message = 'This is a description',
  onClose,
  ...passThroughProps
}: AlertProps & BaseAlertProps) => (
  <Alert
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
    >
      <MdClose
        size="19px"
        color="#646271"
      />
    </CloseButton>
  </Alert>
);
