import { Alert, Snackbar } from '@mui/material'

const Toast = ({ open, message, severity = 'info', onClose, autoHideDuration = 3000 }) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
)

export default Toast
