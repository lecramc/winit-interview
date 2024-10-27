import { serialize } from 'cookie'

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case 'POST':
      res.setHeader(
        'Set-Cookie',
        serialize('authToken', '', {
          maxAge: -1,
          path: '/',
        }),
      )
      return res.status(200).json({ success: true }) // Renvoie un statut JSON
    default:
      return res.status(405).json({ success: false, message: `Method ${method} not allowed` })
  }
}
