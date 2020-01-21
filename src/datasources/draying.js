import { RESTDataSource } from 'apollo-datasource-rest'
import { drayingReducer } from './reducers'
class DrayingAPI extends RESTDataSource {
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

  drayingsReducer(drayings) {
    return Array.isArray(drayings)
      ? drayings.map(draying => drayingReducer(draying))
      : []
  }

  async getAllDrayings() {
    const { data } = await this.get('Draying/Dispatching')
    let drayings = []
    if (data && data.drayings) {
      drayings = data.drayings
    }
    return this.drayingsReducer(drayings)
  }
}
export default DrayingAPI
