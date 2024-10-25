import dbConnect from '@/modules/app/utils/dbConnect'
import Violation from '@/db/mongo/schemas/Violation'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const violation = await Violation.findById(id).select('-__v')
      if (!violation)
        return res.status(404).json({ success: false, message: 'Violation not found' })
      res.status(200).json({ success: true, data: violation })
      break

    case 'PUT':
      const updatedViolation = await Violation.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).select('-__v')
      if (!updatedViolation)
        return res.status(404).json({ success: false, message: 'Violation not found' })
      res.status(200).json({ success: true, data: updatedViolation })
      break

    case 'DELETE':
      const deletedViolation = await Violation.findByIdAndDelete(id)
      if (!deletedViolation)
        return res.status(404).json({ success: false, message: 'Violation not found' })
      res.status(200).json({ success: true, data: deletedViolation })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
