import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalHeader?: boolean;
  modalOverlay?: boolean;
  modalFooter?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  width: string;
};
