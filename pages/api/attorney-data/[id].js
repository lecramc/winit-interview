import dbConnect from '@/modules/app/utils/dbConnect'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import Attorney from '@/db/mongo/schemas/Attorney.js'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const attorney = await Attorney.findById(id).select('-__v')
      if (!attorney) return res.status(404).json({ success: false, message: 'Attorney not found' })
      res.status(200).json({ success: true, data: attorney })
      break
    case 'PUT':
      const updatedAttorney = await Attorney.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).select('-__v')
      if (!updatedAttorney)
        return res.status(404).json({ success: false, message: 'Attorney not found' })
      res.status(200).json({ success: true, data: updatedAttorney })
      break

    case 'DELETE':
      const deletedAttorney = await Attorney.findByIdAndDelete(id)
      if (!deletedAttorney)
        return res.status(404).json({ success: false, message: 'Attorney not found' })
      res.status(200).json({ success: true, data: deletedAttorney })
      break
    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
