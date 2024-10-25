import dbConnect from '@/modules/app/utils/dbConnect'
import TrafficState from '@/db/mongo/schemas/TrafficState'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const state = await TrafficState.findById(id).select('-__v')
      if (!state) return res.status(404).json({ success: false, message: 'TrafficState not found' })
      res.status(200).json({ success: true, data: state })
      break

    case 'PUT':
      const updatedState = await TrafficState.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).select('-__v')
      if (!updatedState)
        return res.status(404).json({ success: false, message: 'TrafficState not found' })
      res.status(200).json({ success: true, data: updatedState })
      break

    case 'DELETE':
      const deletedState = await TrafficState.findByIdAndDelete(id)
      if (!deletedState)
        return res.status(404).json({ success: false, message: 'TrafficState not found' })
      res.status(200).json({ success: true, data: deletedState })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
