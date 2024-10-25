import dbConnect from '@/modules/app/utils/dbConnect'
import AttorneyPriceMap from '@/db/mongo/schemas/AttorneyPriceMap'
import { withErrorHandling } from '@/modules/app/utils/errorMiddleware'

async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      const priceMaps = await AttorneyPriceMap.find().select('-__v')
      res.status(200).json({ success: true, data: priceMaps })
      break

    case 'POST':
      const priceMap = await AttorneyPriceMap.create(req.body)
      res.status(201).json({ success: true, data: priceMap })
      break

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` })
      break
  }
}

export default withErrorHandling(handler)
