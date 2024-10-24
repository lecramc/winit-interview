import axios from 'axios'

const defaultOptions = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  headers: { 'Content-Type': 'application/json' },
}

const instance = axios.create(defaultOptions)

export default instance
