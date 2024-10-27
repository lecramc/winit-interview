import React from 'react'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomInput from '@/modules/app/components/fields/CustomInput.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import useTrafficStateForm from '@/modules/traffic-state/ui/useTrafficStateHookForm.jsx'

const TrafficStateForm = ({ selectedTrafficState, onClose }) => {
  const { control, handleSubmit, errors } = useTrafficStateForm(selectedTrafficState, onClose)

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
        name="longName"
        control={control}
        rules={{ required: 'Long name is required' }}
        render={({ field, fieldState }) => (
          <CustomInput
            {...field}
            label="Long Name"
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="shortName"
        control={control}
        rules={{ required: 'Short name is required' }}
        render={({ field, fieldState }) => (
          <CustomInput
            {...field}
            label="Short Name"
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="enable"
        control={control}
        render={({ field }) => (
          <CustomInput {...field} label="Enabled" fullWidth variant="outlined" type="checkbox" />
        )}
      />

      <Box display="flex" justifyContent="space-between" gap={1} mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {selectedTrafficState ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}

export default TrafficStateForm
