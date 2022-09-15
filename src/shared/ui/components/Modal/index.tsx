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
  isOpen,
  onClose,
  modalHeader,
  modalOverlay,
  modalFooter,
  title,
  body,
  footer,
  width
}: ModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick
  >
    {modalOverlay ? <ModalOverlay /> : ''}
    <ModalContent
      maxWidth={width}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {modalHeader ? <ModalHeader>{title}</ModalHeader> : ''}
      <ModalBody width="100%">{body}</ModalBody>
      {modalFooter ? (
        <ModalFooter
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          {footer}
        </ModalFooter>
      ) : (
        ''
      )}
    </ModalContent>
  </Modal>
);
