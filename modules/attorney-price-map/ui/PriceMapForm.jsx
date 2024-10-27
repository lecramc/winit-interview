import React from 'react'
import { Autocomplete, Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import usePriceMapForm from '@/modules/attorney-price-map/ui/usePriceMapForm.jsx'
import CustomInput from '@/modules/app/components/fields/CustomInput.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'

const PriceMapForm = ({ selectedPriceMap, onClose }) => {
  const {
    control,
    handleSubmit,
    validatePointsRange,
    attorneys,
    violations,
    courts,
    counties,
    errors,
  } = usePriceMapForm(selectedPriceMap, onClose)

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
      {/* Select Attorney */}
      <Controller
        name="attorney"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            {...field}
            options={attorneys}
            getOptionLabel={(option) => option?.name || ''}
            value={attorneys.find((a) => a._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput
                {...params}
                label="Attorney"
                variant="outlined"
                fullWidth
                error={!!fieldState.attorney}
                helperText={fieldState.attorney?.message}
              />
            )}
          />
        )}
      />

      {/* Select Court */}
      <Controller
        name="court"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={courts}
            getOptionLabel={(option) => option?.name || ''}
            value={courts.find((court) => court._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput {...params} label="Court" variant="outlined" fullWidth />
            )}
          />
        )}
      />

      {/* Select County */}
      <Controller
        name="county"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={counties}
            getOptionLabel={(option) => option?.name || ''}
            value={counties.find((county) => county._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput {...params} label="County" variant="outlined" fullWidth />
            )}
          />
        )}
      />

      {/* Select Violation */}
      <Controller
        name="violation"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={violations}
            getOptionLabel={(option) => option.name}
            value={violations.find((violation) => violation._id === field.value?._id) || null}
            onChange={(_, data) => field.onChange(data || '')}
            renderInput={(params) => (
              <CustomInput {...params} label="Violation" variant="outlined" fullWidth />
            )}
          />
        )}
      />

      {/* Points Range and Price Fields */}
      <Box display="flex" gap={2} mt={2}>
        <Controller
          name="pointsRangeMin"
          control={control}
          rules={{
            required: false,
            min: { value: 0, message: 'Points Min must be positive' },
            validate: validatePointsRange,
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="Points Min"
              fullWidth
              variant="outlined"
              type="number"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="pointsRangeMax"
          control={control}
          rules={{
            required: false,
            min: { value: 0, message: 'Points Max must be positive' },
            validate: validatePointsRange,
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="Points Max"
              fullWidth
              variant="outlined"
              type="number"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>

      <Controller
        name="price"
        control={control}
        rules={{ required: 'Price is required' }}
        render={({ field, fieldState }) => (
          <CustomInput
            {...field}
            label="Price"
            fullWidth
            variant="outlined"
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      {errors.partialCriteria && (
        <Typography color="error" variant="body2" mb={1}>
          {errors.partialCriteria.message}
        </Typography>
      )}
      <Box display="flex" justifyContent="space-between" gap={1} mt={3}>
        <CustomButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="primary" type="submit">
          {selectedPriceMap ? 'Update' : 'Create'}
        </CustomButton>
      </Box>
    </form>
  )
}

export default PriceMapForm
