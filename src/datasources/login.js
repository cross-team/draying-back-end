import { RESTDataSource } from 'apollo-datasource-rest'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

class LoginAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.DRAYING_API_URL
  }

  async login({ email, password, host }) {
    const getRequestToken = async () => {
      const fetchResponse = await fetch(
        this.baseURL + 'login/api/v1/account/AntiForgeryToken',
      )
      return (await fetchResponse.text()).replace(`"`, '')
    }
    const authenticate = async () => {
      const body = {
        Email: email,
        Password: password,
        Host: host,
      }
      const parseCookies = response => {
        const raw = response.headers.raw()['set-cookie']
        return raw.map(entry => {
          const parts = entry.split(';')
          const cookiePart = parts[0]
          return cookiePart
        })
      }
      const headers = {
        'X-XSRF-Token': await getRequestToken(),
        'Content-Type': 'application/json',
      }
      const response = await fetch(
        this.baseURL + 'login/api/v1/account/login',
        {
          method: 'post',
          body: JSON.stringify(body),
          headers,
        },
      )
      console.log(headers['X-XSRF-Token'])

      console.log(await response.json())

      if (response.status === 302) {
        return {
          success: true,
          cookies: parseCookies(response),
          message: 'Success!',
        }
      }
      return {
        success: false,
        message: 'Oops something went wrong',
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
