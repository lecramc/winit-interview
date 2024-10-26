// LoadingSpinner.jsx
import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingSpinner = ({ message = 'Loading...', size = 40 }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    sx={{ py: 4 }}
  >
    <CircularProgress size={size} />
    <Typography variant="h6" mt={2} color="textSecondary">
      {message}
    </Typography>
  </Box>
)

export default LoadingSpinner
