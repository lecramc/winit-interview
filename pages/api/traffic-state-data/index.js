import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficState from '@/db/mongo/schemas/TrafficState'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const states = await TrafficState.find().select('-__v')
      res.status(200).json({ success: true, data: states })
      break

    case 'POST':
      const state = await TrafficState.create(req.body)
      res.status(201).json({ success: true, data: state })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
