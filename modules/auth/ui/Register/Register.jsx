import React, { useEffect, useState } from 'react'
import useStore from '@/modules/app/hooks/useStore.js'
import { observer } from 'mobx-react'
import Toast from '@/modules/app/components/toast/Toast.jsx'
import { useRouter } from 'next/router'
import {
  registerViewModel,
  RegisterViewModelType,
} from '@/modules/auth/ui/Register/register.viewmodel.js'
import { registerUsecase } from '@/modules/auth/core/usecases/register.usecase.js'
import RegisterForm from '@/modules/auth/ui/Register/RegisterForm.jsx'

export const Register = observer(() => {
  const store = useStore()
  const router = useRouter()
  const viewModel = registerViewModel(store)
  const [alertOpen, setAlertOpen] = useState(true)

  useEffect(() => {
    console.log(viewModel.type, viewModel.errorMessage)
    if (viewModel.type === RegisterViewModelType.Success) {
      router.push('/login')
    }
  }, [viewModel.type, router])

  const onSubmit = async (data) => {
    await registerUsecase(data)(store)
  }

  const alertNode = (() => {
    switch (viewModel.type) {
      case RegisterViewModelType.Loading:
        return (
          <Toast
            open={alertOpen}
            message="Registering..."
            severity="info"
            onClose={() => setAlertOpen(false)}
          />
        )
      case RegisterViewModelType.Rejected:
        return (
          <Toast
            open={alertOpen}
            message={viewModel.errorMessage || 'Register failed'}
            severity="error"
            onClose={() => setAlertOpen(false)}
            autoHideDuration={5000}
          />
        )
      case RegisterViewModelType.Success:
        return (
          <Toast
            open={alertOpen}
            message="Register successful!"
            severity="success"
            onClose={() => setAlertOpen(false)}
          />
        )
      default:
        return null
    }
  })()

  return (
    <>
      <RegisterForm onSubmit={onSubmit} />
      {alertNode}
    </>
  )
})
