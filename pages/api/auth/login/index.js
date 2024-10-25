import cookie from 'cookie'
import { loginService } from '@/modules/app/services/loginService.js'
import dbConnect from '@/modules/app/utils/dbConnect.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  await dbConnect()
  try {
    const { email, password } = req.body
    const { user, token } = await loginService(email, password)
    console.log('User' + user)
    console.log('Token' + token)
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

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    })
  } catch (error) {
    res.status(401).json({ error: error.message || 'Invalid credentials' })
  }
}
