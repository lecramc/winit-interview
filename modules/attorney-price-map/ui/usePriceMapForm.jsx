import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/modules/app/hooks/useStore.js'
import { updateAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/update-attorney-price-map.usecase.js'
import { createAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/create-attorney-price-map.usecase.js'

const usePriceMapForm = (selectedPriceMap, onClose) => {
  const store = useStore()
  const violations = store.violation.getViolations()
  const attorneys = store.attorney.getAttorneys()
  const counties = store.trafficCounty.getTrafficCounties()
  const courts = store.trafficCourt.getTrafficCourts()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      attorney: '',
      court: null,
      county: null,
      violation: null,
      pointsRangeMin: '',
      pointsRangeMax: '',
      price: '',
    },
  })

  const pointsRangeMin = watch('pointsRangeMin')
  const pointsRangeMax = watch('pointsRangeMax')
  const court = watch('court')
  const county = watch('county')
  const violation = watch('violation')

  useEffect(() => {
    if (selectedPriceMap) {
      reset({
        attorney: selectedPriceMap.attorney || '',
        court: selectedPriceMap.court || '',
        county: selectedPriceMap.county || '',
        violation: selectedPriceMap.violation || '',
        pointsRangeMin: selectedPriceMap.pointsRange ? selectedPriceMap.pointsRange[0] : '',
        pointsRangeMax: selectedPriceMap.pointsRange ? selectedPriceMap.pointsRange[1] : '',
        price: selectedPriceMap.price || '',
      })
    } else {
      reset({
        attorney: '',
        court: '',
        county: '',
        violation: '',
        pointsRangeMin: '',
        pointsRangeMax: '',
        price: '',
      })
    }
  }, [selectedPriceMap, reset])

  const validatePointsRange = () => {
    if (pointsRangeMin && pointsRangeMax) {
      if (parseInt(pointsRangeMax, 10) < parseInt(pointsRangeMin, 10)) {
        setError('pointsRangeMax', {
          type: 'manual',
          message: 'Max points must be greater than or equal to Min points',
        })
        return false
      } else {
        clearErrors('pointsRangeMax')
        return true
      }
    }
    return true
  }

  const validatePartialCriteria = () => {
    if (!court && !county && !violation && !pointsRangeMin && !pointsRangeMax) {
      setError('partialCriteria', {
        type: 'manual',
        message: 'At least one of Court, County, Violation, or Points Range must be specified',
      })
      return false
    } else {
      clearErrors('partialCriteria')
      return true
    }
  }

  const onSubmit = async (data) => {
    if (!validatePartialCriteria()) return
    if (!validatePointsRange()) return
    const formData = {
      ...data,
      pointsRange:
        data.pointsRangeMin && data.pointsRangeMax
          ? [Number(data.pointsRangeMin), Number(data.pointsRangeMax)]
          : undefined,
    }
    console.log(formData)
    if (selectedPriceMap) {
      await updateAttorneyPriceMapUsecase({ ...formData, _id: selectedPriceMap._id })(store)
    } else {
      await createAttorneyPriceMapUsecase(formData)(store)
    }
    reset()
    onClose()
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    validatePointsRange,
    pointsRangeMin,
    pointsRangeMax,
    violations,
    attorneys,
    counties,
    courts,
  }
}

export default usePriceMapForm
