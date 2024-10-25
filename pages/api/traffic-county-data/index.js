import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficCounty from '@/db/mongo/schemas/TrafficCounty'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const counties = await TrafficCounty.find().select('-__v')
      res.status(200).json({ success: true, data: counties })
      break

    case 'POST':
      const county = await TrafficCounty.create(req.body)
      res.status(201).json({ success: true, data: county })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
