import dbConnect from '@/modules/app/utils/dbConnect'
import Attorney from '@/db/mongo/schemas/Attorney'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const attorneys = await Attorney.find().select('-__v')
      res.status(200).json({ success: true, data: attorneys })
      break

    case 'POST':
      const attorney = await Attorney.create(req.body)
      res.status(201).json({ success: true, data: attorney })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
