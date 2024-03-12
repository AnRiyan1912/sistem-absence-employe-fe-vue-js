import { BASE_URL } from '@/util/ApiUrl'
import axios from 'axios'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { Authorization: `Bearer ${sessionStorage.getItem('auth')}` }
  //   withCredentials: true
})

client.interceptors.response.use(
  (response) => {
    return response
  },
  async (err) => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const cookies = document.cookie.split(';')
        let refreshToken = null
        cookies.forEach((cookie) => {
          const [name, value] = cookie.trim().split('=')
          if (name == 'refreshToken') {
            refreshToken = value
          }
        })

        if (!refreshToken) {
          throw new Error('No refresh token found in cookies')
        }
        const response = await axios.post(
          BASE_URL + '/refresh_token',
          { refresh_token: refreshToken },
          { withCredentials: true }
        )

        client.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        return client(originalRequest)
      } catch (err) {
        console.error('Error refreshing token: ' + err)
        throw err
      }
    }
    return Promise.reject(err)
  }
)

export default client
