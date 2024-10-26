import React from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 12,
  p: 2,
  textAlign: 'center',
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirmColor = 'error',
  cancelColor = 'primary',
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {message}
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="outlined" color={cancelColor} onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="contained" color={confirmColor} onClick={onConfirm}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
