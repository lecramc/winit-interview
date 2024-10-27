import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/modules/app/hooks/useStore.js'
import { updateTrafficCountyUsecase } from '@/modules/traffic-county/core/usecases/update-traffic-county.usecase.js'
import { createTrafficCountyUsecase } from '@/modules/traffic-county/core/usecases/create-traffic-county.usecase.js'

const useTrafficCountyForm = (selectedTrafficCounty, onClose) => {
  const store = useStore()
  const trafficStates = store.trafficState.getTrafficStates()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      trafficState: null,
      enable: true,
    },
  })

  useEffect(() => {
    if (selectedTrafficCounty) {
      reset({
        name: selectedTrafficCounty.name || '',
        trafficState: selectedTrafficCounty.trafficState || null,
        enable: selectedTrafficCounty.enable ?? true,
      })
    } else {
      reset({
        name: '',
        trafficState: null,
        enable: true,
      })
    }
  }, [selectedTrafficCounty, reset])

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    }

    try {
      if (selectedTrafficCounty) {
        await updateTrafficCountyUsecase({ ...formData, _id: selectedTrafficCounty._id })(store)
      } else {
        await createTrafficCountyUsecase(formData)(store)
      }
      reset()
      onClose()
    } catch (error) {
      setError('submit', { message: 'An error occurred while saving the Traffic County' })
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    trafficStates,
  }
}

export default useTrafficCountyForm
