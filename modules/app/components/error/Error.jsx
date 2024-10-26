// ErrorMessage.jsx
import React from 'react'
import { Box, Button, Typography } from '@mui/material'

const ErrorMessage = ({ message = 'An error occurred', description, onRetry }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    sx={{
      py: 4,
      px: 2,
      backgroundColor: '#fdecea',
      borderRadius: 2,
      border: '1px solid #f5c6cb',
      color: '#a94442',
    }}
  >
    <Typography variant="h6" color="error" align="center">
      {message}
    </Typography>
    {description && (
      <Typography variant="body2" color="textSecondary" align="center" mt={1}>
        {description}
      </Typography>
    )}
    {onRetry && (
      <Button variant="outlined" color="error" onClick={onRetry} sx={{ mt: 2 }}>
        Retry
      </Button>
    )}
  </Box>
)

export default ErrorMessage
