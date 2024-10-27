import dbConnect from '@/modules/app/utils/dbConnect'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import TrafficCounty from '@/db/mongo/schemas/TrafficCounty.js'
import TrafficState from '@/db/mongo/schemas/TrafficState.js'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const county = await TrafficCounty.findById(id)
        .populate({ path: 'trafficState', model: TrafficState })
        .select('-__v')
      if (!county)
        return res.status(404).json({ success: false, message: 'Traffic County not found' })
      res.status(200).json({ success: true, data: county })
      break

    case 'PUT':
      const updatedCounty = await TrafficCounty.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
        .populate({ path: 'trafficState', model: TrafficState })
        .select('-__v')
      if (!updatedCounty)
        return res.status(404).json({ success: false, message: 'Traffic County not found' })
      res.status(200).json({ success: true, data: updatedCounty })
      break

    case 'DELETE':
      const deletedCounty = await TrafficCounty.findByIdAndDelete(id)
        .populate({
          path: 'trafficState',
          model: TrafficState,
        })
        .select('-__v')
      if (!deletedCounty)
        return res.status(404).json({ success: false, message: 'Traffic County not found' })
      res.status(200).json({ success: true, data: deletedCounty })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
