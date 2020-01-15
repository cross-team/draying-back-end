import { RESTDataSource } from 'apollo-datasource-rest'
import fetch from 'node-fetch'

class LoginAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.DRAYING_API_URL
  }

  async login({ email, password, host }) {
    const parseCookies = response => {
      const raw = response.headers.raw()['set-cookie']
      return raw.map(entry => {
        const parts = entry.split(';')
        const cookiePart = parts[0]
        return cookiePart
      })
    }
    const getRequestToken = async () => {
      const fetchResponse = await fetch(
        this.baseURL + 'login/api/v1/account/AntiForgeryToken',
      )
      const requestCookie = parseCookies(fetchResponse)
      return [(await fetchResponse.text()).replace(/"/g, ''), requestCookie[0]]
    }
    const authenticate = async () => {
      const body = {
        Email: email,
        Password: password,
        Host: host,
      }

      const [requestToken, requestCookie] = await getRequestToken()
      const headers = {
        'X-XSRF-Token': requestToken,
        'Content-Type': 'application/json',
        Cookie: requestCookie,
      }

      const response = await fetch(
        this.baseURL + 'login/api/v1/account/login',
        {
          method: 'post',
          body: JSON.stringify(body),
          headers,
        },
      )

      const { status, message } = await response.json()
      if (response.ok) {
        return {
          success: status,
          cookies: parseCookies(response),
          message: 'Success!',
        }
      }
      return {
        success: status,
        message,
      }
    }

    const { success, cookies, message } = await authenticate()

    if (success) {
      this.context.res.set('Set-Cookie', cookies[2])
    }

    return {
      success,
      message,
    }
  }
}
export default LoginAPI
