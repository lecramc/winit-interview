import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/modules/app/hooks/useStore.js'
import { updateViolationUsecase } from '@/modules/violation/core/usecases/update-violation.usecase.js'
import { createViolationUsecase } from '@/modules/violation/core/usecases/create-violation.usecase.js'

const useViolationForm = (selectedViolation, onClose) => {
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
      name: '',
      points: 0,
      enable: true,
    },
  })

  useEffect(() => {
    if (selectedViolation) {
      reset({
        name: selectedViolation.name || '',
        points: selectedViolation.points || 0,
        enable: selectedViolation.enable ?? true,
      })
    } else {
      reset({
        name: '',
        points: 0,
      })
    }
  }, [selectedViolation, reset])

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    }

    try {
      if (selectedViolation) {
        await updateViolationUsecase({ ...formData, _id: selectedViolation._id })(store)
      } else {
        await createViolationUsecase(formData)(store)
      }
      reset()
      onClose()
    } catch (error) {
      setError('submit', { message: 'An error occurred while saving the Violation' })
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  }
}

export default useViolationForm
