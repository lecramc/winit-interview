// pages/api/users/[id].js

import dbConnect from '@/modules/app/utils/dbConnect'
import User from '@/db/mongo/schemas/User'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  await dbConnect()

  switch (method) {
    case 'GET':
      const user = await User.findById(id).select('-__v -password')
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }
      res.status(200).json({ success: true, user })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
