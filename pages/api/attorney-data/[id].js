import dbConnect from '@/modules/app/utils/dbConnect.js'
import Attorney from '@/db/mongo/schemas/Attorney.js'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  // To be completed
  switch (method) {
    case 'GET':
      try {
        const attorneys = await Attorney.find().select('-__v')
        res.status(200).json({ success: true, data: attorneys })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query

        const attorney = await Attorney.findByIdAndDelete(id).select('-__v')

        if (!attorney) {
          return res.status(404).json({ success: false, message: 'Attorney not found' })
        }

        res.status(200).json({ success: true, data: attorney })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}