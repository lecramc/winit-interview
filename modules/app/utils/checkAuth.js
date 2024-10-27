import { decodeJwt } from 'jose'
import { getUserUsecase } from '@/modules/auth/core/usecases/get-user.usecase.js'
import { serialize } from 'cookie'

const deleteCookie = (ctx) => {
  ctx.res.setHeader(
    'Set-Cookie',
    serialize('authToken', '', {
      maxAge: -1,
      path: '/',
    }),
  )
}
export default async function checkAuth(store, ctx) {
  const authToken = ctx.req.cookies.authToken

  if (authToken) {
    try {
      const decodedToken = decodeJwt(authToken)
      const now = Math.floor(Date.now() / 1000)
      if (decodedToken.exp && decodedToken.exp > now && decodedToken.userId) {
        await getUserUsecase(decodedToken.userId)(store)
        if (!store.auth.user || store.auth.user._id !== decodedToken.userId) {
          deleteCookie(ctx)
        }
      } else {
        deleteCookie(ctx)
      }
    } catch (error) {
      console.error('Erreur de décodage du token:', error)
      deleteCookie(ctx)
    }
  }
}
