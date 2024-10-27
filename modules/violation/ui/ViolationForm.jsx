import React from 'react'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomInput from '@/modules/app/components/fields/CustomInput.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import useViolationForm from '@/modules/violation/ui/useViolationHookForm.jsx'

const ViolationForm = ({ selectedViolation, onClose }) => {
  const { control, handleSubmit, errors } = useViolationForm(selectedViolation, onClose)

  return (
    <form onSubmit={handleSubmit}>
      <Controller
        name="enable"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                color="primary"
              />
            }
            label="Enable"
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState }) => (
          <CustomInput
            {...field}
            label="Name"
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="points"
        control={control}
        rules={{ required: 'Points are required' }}
        render={({ field, fieldState }) => (
          <CustomInput
            {...field}
            label="Points"
            fullWidth
            variant="outlined"
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" gap={1} mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {selectedViolation ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}

export default ViolationForm
