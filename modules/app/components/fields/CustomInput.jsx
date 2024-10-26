import React from 'react'
import { TextField } from '@mui/material'

const CustomTextField = ({
  label,
  error = false,
  helperText = '',
  fullWidth = true,
  variant = 'outlined',
  size = 'small',
  margin = 'normal',
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      margin={margin}
      error={error}
      helperText={helperText}
      {...props}
    />
  )
}

export default CustomTextField
