import dbConnect from '@/modules/app/utils/dbConnect'
import Attorney from '@/db/mongo/schemas/Attorney'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import mongoose from 'mongoose'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const attorneys = await Attorney.find().select('-__v')
      res.status(200).json({ success: true, data: attorneys })
      break

    case 'POST':
      const data = {
        ...req.body,
        _id: req.body._id || new mongoose.Types.ObjectId(),
      }
      const attorney = await Attorney.create(data)
      res.status(201).json({ success: true, data: attorney })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
