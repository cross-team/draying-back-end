import { RESTDataSource } from 'apollo-datasource-rest'
import { clientReducer } from './reducers'

class ClientApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/api/v1/'
  }

  willSendRequest(request) {
    request.headers.set(
      'Cookie',
      `.DRAYINGAUTH=${this.context.cookies['.DRAYINGAUTH']}`,
    )
  }

  async getClient({ clientId }) {
    try {
      const path = `Client/${clientId}`
      const response = await this.get(path)
      if (response.status) {
        return clientReducer(response.data)
      }
      return null
    } catch (error) {
      return null
    }
  }
}
export default ClientApi
