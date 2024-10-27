import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficCounty from '@/db/mongo/schemas/TrafficCounty'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import TrafficState from '@/db/mongo/schemas/TrafficState.js'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const counties = await TrafficCounty.find()
        .populate({ path: 'trafficState', model: TrafficState })
        .select('-__v')
      console.log(counties)
      res.status(200).json({ success: true, data: counties })
      break

    case 'POST':
      const county = await TrafficCounty.create(req.body)
      const newCourt = await TrafficCounty.findById(county._id)
        .populate({ path: 'trafficState', model: TrafficState })
        .select('-__v')
      res.status(201).json({ success: true, data: newCourt })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
