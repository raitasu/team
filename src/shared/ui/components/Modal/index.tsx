import React from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

import { ModalProps } from './modal.types';

export const BaseModal = ({
  title,
  shouldUseOverlay,
  footer,
  children,
  contentProps,
  closeOnOverlayClick = true,
  ...pathThroughModalProps
}: ModalProps) => (
  <Modal
    closeOnOverlayClick={closeOnOverlayClick}
    {...pathThroughModalProps}
  >
    {shouldUseOverlay && <ModalOverlay />}
    <ModalContent
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      {...contentProps}
    >
      {title && <ModalHeader>{title}</ModalHeader>}
      <ModalBody width="100%">{children}</ModalBody>
      {footer && (
        <ModalFooter
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          {footer}
        </ModalFooter>
      )}
    </ModalContent>
  </Modal>
);
