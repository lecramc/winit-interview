import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficCourt from '@/db/mongo/schemas/TrafficCourt'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import TrafficState from '@/db/mongo/schemas/TrafficState.js'
import TrafficCounty from '@/db/mongo/schemas/TrafficCounty.js'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const courts = await TrafficCourt.find()
        .populate({ path: 'trafficState', model: TrafficState })
        .populate({ path: 'trafficCounty', model: TrafficCounty })
        .select('-__v')
      res.status(200).json({ success: true, data: courts })
      break

    case 'POST':
      const court = await TrafficCourt.create(req.body)
      const newCourt = await TrafficCourt.findById(court._id)
        .populate({ path: 'trafficState', select: '-__v', model: TrafficState })
        .populate({ path: 'trafficCounty', select: '-__v', model: TrafficCounty })

        .select('-__v')
      res.status(201).json({ success: true, data: newCourt })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
