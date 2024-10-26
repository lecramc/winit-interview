import { loginViewModel, LoginViewModelType } from '@/modules/auth/ui/Login/login.viewmodel.js'
import React, { useEffect, useState } from 'react'
import useStore from '@/modules/app/hooks/useStore.js'
import { observer } from 'mobx-react'
import LoginForm from '@/modules/auth/ui/Login/LoginForm.jsx'
import Toast from '@/modules/app/components/toast/Toast.jsx'
import { useRouter } from 'next/router.js'
import { loginUsecase } from '@/modules/auth/core/usecases/login.usecase.js'

export const Login = observer(() => {
  const store = useStore()
  const router = useRouter()
  const viewModel = loginViewModel(store)
  const [alertOpen, setAlertOpen] = useState(true)

  useEffect(() => {
    if (viewModel.type === LoginViewModelType.Success) {
      router.push('/dashboard')
    }
  }, [viewModel.type, router])

  useEffect(() => {
    if (viewModel.type !== LoginViewModelType.Idle) {
      setAlertOpen(true)
    }
  }, [viewModel.type])

  const onSubmit = async (data) => {
    await loginUsecase(data)(store)
  }

  const alertNode = (() => {
    switch (viewModel.type) {
      case LoginViewModelType.Loading:
        return (
          <Toast
            open={alertOpen}
            message="Logging in..."
            severity="info"
            onClose={() => setAlertOpen(false)}
          />
        )
      case LoginViewModelType.Rejected:
        return (
          <Toast
            open={alertOpen}
            message={viewModel.errorMessage || 'Login failed'}
            severity="error"
            onClose={() => setAlertOpen(false)}
            autoHideDuration={5000}
          />
        )
      case LoginViewModelType.Success:
        return (
          <Toast
            open={alertOpen}
            message="Login successful!"
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
      <LoginForm onSubmit={onSubmit} />
      {alertNode}
    </>
  )
})
