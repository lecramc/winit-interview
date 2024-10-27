import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import { useRouter } from 'next/router'

export const Logout = () => {
  const store = useStore()
  const router = useRouter()
  const handleLogout = async () => {
    await store.auth.logout()
    if (!store.auth.user) {
      window.location.href = '/login'
    }
  }

  return (
    <CustomButton variant="outlined" color="black" onClick={handleLogout}>
      Logout
    </CustomButton>
  )
}
