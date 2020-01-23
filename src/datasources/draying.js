import { RESTDataSource } from 'apollo-datasource-rest'
import {
  drayingReducer,
  tripActionReducer,
  locationTypeReducer,
  tripReducer,
} from './reducers'
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

  nextActionsReducer(nextActions) {
    return {
      tripActions: nextActions.trip_actions
        ? nextActions.trip_actions.map(tripActionReducer)
        : null,
      startLocationTypes: nextActions.start_locations
        ? nextActions.start_locations.map(locationTypeReducer)
        : null,
      drayingTrip: tripReducer(nextActions.draying_trip),
    }
  }

  async getDrayingNextActions({ drayingId, tripId }) {
    let query = `DeliveryOrderDraying/${drayingId}/nextactions`
    if (typeof tripId !== 'undefined') {
      query = `${query}/${tripId}`
    }
    const { data } = await this.get(query)
    return this.nextActionsReducer(data)
  }
}
export default DrayingAPI
