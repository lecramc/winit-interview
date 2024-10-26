// AppButton.jsx
import React from 'react'
import { Button, CircularProgress } from '@mui/material'

const CustomButton = ({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'small',
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
