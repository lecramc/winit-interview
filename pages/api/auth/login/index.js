import cookie from 'cookie'
import { loginService } from '@/modules/app/services/loginService'
import dbConnect from '@/modules/app/utils/dbConnect'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      const { email, password } = req.body

      const { user, token } = await loginService(email, password)

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 jour
          sameSite: 'strict',
          path: '/',
        }),
      )

      return res.status(200).json({
        success: true,

        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      })

    default:
      return res.status(405).json({ success: false, message: `Method ${method} not allowed` })
  }
}

export default withErrorHandling(handler)
