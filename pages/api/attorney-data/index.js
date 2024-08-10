import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  // To be completed
  switch (method) {
    case 'GET':
      try {
        const attorneys = await Attorney.find({})
        res.status(200).json({ success: true, data: attorneys })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const attorney = await Attorney.create(req.body)
        res.status(201).json({ success: true, data: attorney })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
