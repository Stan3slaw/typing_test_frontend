import React from 'react';
import { Box, Modal as MuiModal } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element;
}

const contentContainerStyles = {
  position: 'absolute',
  bottom: '63.3%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 185,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.paper',
  outline: '0',
  borderRadius: '8px',
  p: '0px 50px',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <MuiModal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={contentContainerStyles}>{children}</Box>
  </MuiModal>
);

export default Modal;
