import { decodeJwt } from 'jose'
import { getUserUsecase } from '@/modules/auth/core/usecases/get-user.usecase.js'

export default async function checkAuth(store, cookies) {
  const authToken = cookies.authToken

  if (authToken) {
    try {
      const decodedToken = decodeJwt(authToken)
      const now = Math.floor(Date.now() / 1000)
      if (decodedToken.exp && decodedToken.exp > now && decodedToken.userId) {
        await getUserUsecase(decodedToken.userId)(store)
      }
      delete cookies.authToken
    } catch (error) {
      delete cookies.authToken
      console.error('Erreur de décodage du token:', error)
    }
  }
}
