import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/db/mongo/schemas/User.js'
import { JWT_SECRET } from '@/constants.js'

export async function loginService(email, password) {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error(`User not found ${email}`)
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw new Error('Password does not match')
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' })
  return { user, token }
}
