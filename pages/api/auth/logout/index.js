const authGateway = new HttpAuthGateway()

export default function handler(req, res) {
  if (req.method === 'POST') {
    authGateway.logout(res)
    res.status(200).json({ success: true })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}
