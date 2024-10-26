// pages/api/users/index.js

import dbConnect from '@/modules/app/utils/dbConnect'
import User from '@/db/mongo/schemas/User'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      const { name, email, password } = req.body

      const user = await User.create({ name, email, password })

      return res.status(201).json({
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
