import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficCourt from '@/db/mongo/schemas/TrafficCourt'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const court = await TrafficCourt.findById(id).select('-__v')
      if (!court)
        return res.status(404).json({ success: false, message: 'Traffic Court not found' })
      res.status(200).json({ success: true, data: court })
      break

    case 'PUT':
      const updatedCourt = await TrafficCourt.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).select('-__v')
      if (!updatedCourt)
        return res.status(404).json({ success: false, message: 'Traffic Court not found' })
      res.status(200).json({ success: true, data: updatedCourt })
      break

    case 'DELETE':
      const deletedCourt = await TrafficCourt.findByIdAndDelete(id)
      if (!deletedCourt)
        return res.status(404).json({ success: false, message: 'Traffic Court not found' })
      res.status(200).json({ success: true, data: deletedCourt })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
