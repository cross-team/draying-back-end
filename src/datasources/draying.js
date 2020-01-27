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
      drayingTrip: nextActions.draying_trip
        ? tripReducer(nextActions.draying_trip)
        : null,
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

  async updateParameter({ drayingId, field, value }) {
    const query = `DeliveryOrderDraying/UpdateParameter/`
    const response = await this.post(query, {
      DeliveryOrderDrayingId: drayingId,
      key: field,
      value,
    })
    if (response.status) {
      return {
        success: response.status,
        message: 'success',
        updatedId: drayingId,
      }
    }
    return {
      success: response.status,
      message: 'Oops Something went wrong',
      updatedId: null,
    }
  }

  async checkContainerNumber({ drayingId, containerNumber }) {
    const query = `DeliveryOrderDraying/CheckContainerNumber`
    const containerReducer = container => ({
      container: container.Container,
      drayingId: container.DeliveryOrderDrayingId,
      orderId: container.DeliveryOrderId,
      createdOn: container.CreatedOn,
      companyName: container.CompanyName,
    })
    try {
      const response = await this.post(query, [
        {
          DeliveryOrderDrayingId: drayingId,
          Container: containerNumber,
        },
      ])
      if (response.status && response.data[containerNumber]) {
        return {
          exists: true,
          message: 'Container alreadly exists',
          containersFound: response.data[containerNumber].map(containerReducer),
        }
      }
      return {
        exists: false,
        message: 'Container not found in system',
      }
    } catch (error) {
      return {
        exists: false,
        message: 'Oops something went wrong',
      }
    }
  }

  async updateDraying({ drayingId, field, value }) {
    return this.updateParameter({ drayingId, field, value })
  }
}
export default DrayingAPI
