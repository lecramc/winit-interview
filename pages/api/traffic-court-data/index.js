import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficCourt from '@/db/mongo/schemas/TrafficCourt'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const courts = await TrafficCourt.find().select('-__v')
      res.status(200).json({ success: true, data: courts })
      break

    case 'POST':
      const court = await TrafficCourt.create(req.body)
      res.status(201).json({ success: true, data: court })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
