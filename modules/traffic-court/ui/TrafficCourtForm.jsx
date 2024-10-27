import React from 'react'
import { Autocomplete, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomInput from '@/modules/app/components/fields/CustomInput.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import useTrafficCourtForm from '@/modules/traffic-court/ui/useTrafficCourtForm.jsx'

const TrafficCourtForm = ({ selectedTrafficCourt, onClose }) => {
  const { control, handleSubmit, errors, trafficStates, trafficCounties } = useTrafficCourtForm(
    selectedTrafficCourt,
    onClose,
  )

  return (
    <form onSubmit={handleSubmit}>
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
        name="address"
        control={control}
        render={({ field }) => (
          <CustomInput {...field} label="Address" fullWidth variant="outlined" />
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

      <Controller
        name="trafficCounty"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={trafficCounties}
            getOptionLabel={(option) => option?.name || ''}
            value={trafficCounties.find((county) => county._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput {...params} label="Traffic County" variant="outlined" fullWidth />
            )}
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" gap={1} mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {selectedTrafficCourt ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}

export default TrafficCourtForm
