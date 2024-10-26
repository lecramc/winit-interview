import { Controller } from 'react-hook-form'
import CustomTextField from '@/modules/app/components/fields/CustomInput.jsx'
import { Box } from '@mui/material'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { AttorneyDrawerViewModelType } from '@/modules/attorney/ui/panel/components/attorney-drawer.viewmodel.js'
import React from 'react'

export const AttorneyForm = ({
  children,
  control,
  handleSubmit,
  submitHandler,
  viewModel,
  handleClose,
}) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <CustomTextField {...field} label="Name" fullWidth margin="normal" required />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <CustomTextField {...field} label="Address" fullWidth margin="normal" />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <CustomTextField {...field} label="Phone" fullWidth margin="normal" />
        )}
      />
      {children}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {viewModel.type === AttorneyDrawerViewModelType.Edit ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}
