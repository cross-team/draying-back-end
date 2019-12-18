import { RESTDataSource } from 'apollo-datasource-rest'

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

  drayingReducer(draying) {
    return {
      id: draying.DeliveryOrderDrayingId,
      order: draying.DeliveryOrderId,
    }
  }

  async getAllDrayings() {
    const {
      data: { drayings },
    } = await this.get('Draying/Dispatching')
    return Array.isArray(drayings)
      ? drayings.map(draying => this.drayingReducer(draying))
      : []
  }
}
export default DrayingAPI
