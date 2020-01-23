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

  async getAllDrayings({
    containerStages,
    containerTypes,
    currentLocationTypes,
    inMovement,
    routeDriverId,
    routeDate,
    sort,
    orderBy,
  }) {
    const params = {
      ContainerStages: containerStages || [],
      ContainerTypes: containerTypes || [],
      CurrentLocationTypes: currentLocationTypes || [],
      InMovement: inMovement,
      RouteDriverId: routeDriverId,
      RouteDate: routeDate,
      Sort: sort,
      OrderBy: orderBy,
    }
    const { data } = await this.get('Draying/Dispatching', params)
    let drayings = []
    if (data && data.drayings) {
      drayings = data.drayings
    }
    return this.drayingsReducer(drayings)
  }

  async getDeliveryOrderDraying({ drayingId }) {
    const { data } = await this.get(`DeliveryOrderDraying/${drayingId}`)
    return drayingReducer(data)
  }
}
export default DrayingAPI
