import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/modules/app/hooks/useStore.js'
import { updateTrafficStateUsecase } from '@/modules/traffic-state/core/usecases/update-traffic-state.usecase.js'
import { createTrafficStateUsecase } from '@/modules/traffic-state/core/usecases/create-traffic-state.usecase.js'

const useTrafficStateForm = (selectedTrafficState, onClose) => {
  const store = useStore()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      longName: '',
      shortName: '',
      enable: true,
    },
  })

  useEffect(() => {
    if (selectedTrafficState) {
      reset({
        longName: selectedTrafficState.longName || '',
        shortName: selectedTrafficState.shortName || '',
        enable: selectedTrafficState.enable ?? true,
      })
    } else {
      reset({
        longName: '',
        shortName: '',
        enable: true,
      })
    }
  }, [selectedTrafficState, reset])

  const onSubmit = async (data) => {
    const formData = { ...data }

    try {
      if (selectedTrafficState) {
        await updateTrafficStateUsecase({ ...formData, _id: selectedTrafficState._id })(store)
      } else {
        await createTrafficStateUsecase(formData)(store)
      }
      reset()
      onClose()
    } catch (error) {
      setError('submit', { message: 'An error occurred while saving the Traffic State' })
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  }
}

export default useTrafficStateForm
