import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/modules/app/hooks/useStore.js'
import { updateTrafficCourtUsecase } from '@/modules/traffic-court/core/usecases/update-traffic-court.usecase.js'
import { createTrafficCourtUsecase } from '@/modules/traffic-court/core/usecases/create-traffic-court.usecase.js'

const useTrafficCourtForm = (selectedTrafficCourt, onClose) => {
  const store = useStore()
  const trafficStates = store.trafficState.getTrafficStates()
  const trafficCounties = store.trafficCounty.getTrafficCounties()

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
      address: '',
      trafficState: null,
      trafficCounty: null,
    },
  })

  useEffect(() => {
    if (selectedTrafficCourt) {
      reset({
        name: selectedTrafficCourt.name || '',
        address: selectedTrafficCourt.address || '',
        trafficState: selectedTrafficCourt.trafficState || null,
        trafficCounty: selectedTrafficCourt.trafficCounty || null,
      })
    } else {
      reset({
        name: '',
        address: '',
        trafficState: null,
        trafficCounty: null,
      })
    }
  }, [selectedTrafficCourt, reset])

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    }

    try {
      if (selectedTrafficCourt) {
        await updateTrafficCourtUsecase({ ...formData, _id: selectedTrafficCourt._id })(store)
      } else {
        await createTrafficCourtUsecase(formData)(store)
      }
      reset()
      onClose()
    } catch (error) {
      setError('submit', { message: 'An error occurred while saving the Traffic Court' })
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    trafficStates,
    trafficCounties,
  }
}

export default useTrafficCourtForm
