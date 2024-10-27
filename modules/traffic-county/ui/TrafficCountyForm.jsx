import React from 'react'
import { Autocomplete, Box, Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomInput from '@/modules/app/components/fields/CustomInput.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import useTrafficCountyForm from '@/modules/traffic-county/ui/useTrafficCountyForm.jsx'

const TrafficCountyForm = ({ selectedTrafficCounty, onClose }) => {
  const { control, handleSubmit, errors, trafficStates } = useTrafficCountyForm(
    selectedTrafficCounty,
    onClose,
  )
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
        name="trafficState"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={trafficStates}
            getOptionLabel={(option) => option?.longName || ''}
            value={trafficStates.find((state) => state._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput {...params} label="Traffic State" variant="outlined" fullWidth />
            )}
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" gap={1} mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {selectedTrafficCounty ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}

export default TrafficCountyForm
