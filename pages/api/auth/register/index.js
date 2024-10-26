import dbConnect from '@/modules/app/utils/dbConnect.js'
import User from '@/db/mongo/schemas/User.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  await dbConnect()
  try {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })
    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    })
  } catch (error) {
    res.status(401).json({ error: error.message || 'Create failed' })
  }
}
