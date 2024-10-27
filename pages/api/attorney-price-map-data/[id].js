import dbConnect from '@/modules/app/utils/dbConnect'
import AttorneyPriceMap from '@/db/mongo/schemas/AttorneyPriceMap'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  await dbConnect()

  switch (method) {
    case 'GET':
      const priceMap = await AttorneyPriceMap.findById(id)
        .populate('court')
        .populate('county')
        .populate('violation')
        .populate('attorney')

        .select('-__v')

      if (!priceMap)
        return res.status(404).json({ success: false, message: 'AttorneyPriceMap not found' })
      res.status(200).json({ success: true, data: priceMap })
      break

    case 'PUT':
      const updatedPriceMap = await AttorneyPriceMap.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
        .populate('attorney')
        .populate('court')
        .populate('county')
        .populate('violation')
        .select('-__v')
      if (!updatedPriceMap)
        return res.status(404).json({ success: false, message: 'AttorneyPriceMap not found' })
      res.status(200).json({ success: true, data: updatedPriceMap })
      break

    case 'DELETE':
      const deletedPriceMap = await AttorneyPriceMap.findByIdAndDelete(id)
        .populate('attorney')
        .populate('court')
        .populate('county')
        .populate('violation')
        .select('-__v')
      if (!deletedPriceMap)
        return res.status(404).json({ success: false, message: 'AttorneyPriceMap not found' })
      res.status(200).json({ success: true, data: deletedPriceMap })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
