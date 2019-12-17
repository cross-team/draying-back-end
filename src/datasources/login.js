const { RESTDataSource } = require('apollo-datasource-rest')
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
const { URLSearchParams } = require('url')

class LoginAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/'
    }

    async login({ email, password }) {
        const getRequestToken = async () => {
            const fetchResponse = await fetch(this.baseURL + 'login')
            const loginForm = parse(
                await fetchResponse.text({
                    type: 'text/html',
                }),
            ).querySelector('#loginForm')
            return loginForm.firstChild.attributes.value
        }
        const parseCookies = response => {
            const raw = response.headers.raw()['set-cookie']
            return raw.map(entry => {
                const parts = entry.split(';')
                const cookiePart = parts[0]
                return cookiePart
            })
        }
        const authenticate = async () => {
            const params = new URLSearchParams()
            params.append('__RequestVerificationToken', getRequestToken())
            params.append('Email', email)
            params.append('Password', password)

            const response = await fetch(this.baseURL + 'Login', {
                method: 'post',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'manual',
            })
            if (response.status === 302) {
                return {
                    success: true,
                    cookies: parseCookies(response),
                }
            }
            return {
                success: false,
            }
        }

        const { success, cookies } = await authenticate()
        if (success) {
            this.context.res.set('Set-Cookie', cookies[2])
        }

        return { success }
    }
}
module.exports = LoginAPI
