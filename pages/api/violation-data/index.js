import dbConnect from '@/modules/app/utils/dbConnect'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'
import Violation from '@/db/mongo/schemas/Violation.js'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const violations = await Violation.find().select('-__v')
      res.status(200).json({ success: true, data: violations })
      break

    case 'POST':
      const violation = await Violation.create(req.body)
      res.status(201).json({ success: true, data: violation })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
