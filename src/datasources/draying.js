import { RESTDataSource } from 'apollo-datasource-rest'

class DrayingAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `${process.env.DRAYING_API_URL}api/v1/`
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
    const { data } = await this.get('Draying/Dispatching')
    let drayings = []
    if (data && data.drayings) {
      drayings = data.drayings
    }
    return Array.isArray(drayings)
      ? drayings.map(draying => this.drayingReducer(draying))
      : []
  }
}
export default DrayingAPI
