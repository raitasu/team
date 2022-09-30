import React from 'react';

import { AlertProps } from '@chakra-ui/alert';
import {
  Alert,
  AlertDescription,
  Box,
  Button,
  CloseButton
} from '@chakra-ui/react';
import {
  MdClose,
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline
} from 'react-icons/md';

import { AlertStyles as styles } from './alert.styles';
import { BaseAlertProps } from './alert.types';

export const BaseAlert = ({
  isError,
  isVisible,
  status,
  variant,
  message = 'This is a description',
  onClose,
  onOpen,
  ...passThroughProps
}: AlertProps & BaseAlertProps) => (
  <Box>
    {isVisible ? (
      <Alert
        {...passThroughProps}
        status={status}
        variant={variant}
        sx={
          !isError
            ? { ...styles.container, ...styles.success }
            : { ...styles.container, ...styles.error }
        }
      >
        {isError ? (
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
    ) : (
      <Button onClick={onOpen}>Show Alert</Button>
    )}
  </Box>
);
