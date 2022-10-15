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
  closeOnOverlayClick: shouldCloseOnOverlayClick = true,
  ...pathThroughModalProps
}: ModalProps) => (
  <Modal
    closeOnOverlayClick={shouldCloseOnOverlayClick}
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
