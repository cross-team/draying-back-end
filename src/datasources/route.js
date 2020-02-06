import { RESTDataSource } from 'apollo-datasource-rest'
import { routeReducer } from './reducers'
import { serverErrorUpdateResponse } from './errors'

class RouteApi extends RESTDataSource {
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

  routesReducer(routes) {
    return Array.isArray(routes) ? routes.map(route => routeReducer(route)) : []
  }

  async getDriverRoute({ driverId, fromDate, toDate, pending, orderBy }) {
    let queryParams = {
      DriverId: driverId,
    }

    if (fromDate) {
      queryParams = {
        ...queryParams,
        FromDate: fromDate,
      }
    }

    if (toDate) {
      queryParams = {
        ...queryParams,
        ToDate: toDate,
      }
    }

    if (pending) {
      queryParams = {
        ...queryParams,
        ShowPending: pending,
      }
    }

    if (orderBy) {
      queryParams = {
        ...queryParams,
        OrderBy: orderBy,
      }
    }
    const { data } = await this.get('Route', queryParams)
    let routes = []
    if (data) {
      routes = data
    }
    return this.routesReducer(routes)
  }

  tripInputMapper(trip) {
    const messagesMapper = message => {
      return {
        Body: message.body,
      }
    }
    return {
      ...(trip.tripId && { DrayingTripId: trip.tripId }),
      ...(trip.drayingId && { DeliveryOrderDrayingId: trip.drayingId }),
      ...(trip.drayingId && { TripActionId: trip.tripActionId }),
      ...(trip.tripStatusId && { TripStatusId: trip.tripStatusId }),
      ...(trip.orderId && { Order: trip.orderId }),
      ...(trip.driverId && { DriverId: trip.driverId }),
      ...(trip.tripActionLocationId && {
        TripActionLocationId: trip.tripActionLocationId,
      }),
      ...(trip.paidByClient && { PaidByClient: trip.paidByClient }),
      ...(trip.startLocationTypeId && {
        StartLocationTypeId: trip.startLocationTypeId,
      }),
      ...(trip.endLocationTypeId && {
        EndLocationTypeId: trip.endLocationTypeId,
      }),
      ...(trip.routeId && { RouteId: trip.routeId }),
      ...(trip.tripMessages && {
        DrayingTripMessages: trip.tripMessages.map(messagesMapper),
      }),
    }
  }

  async dispatchDraying({ trip }) {
    const path = `route/dispatch`
    const params = this.tripInputMapper(trip)
    try {
      const response = await this.post(path, params)
      if (response.status) {
        return {
          success: true,
          message: 'success',
          updatedId: null,
        }
      }
      return {
        success: false,
        message: 'Oops something went wrong, unable to dispatch',
        updatedId: false,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async updateTrip({ trip }) {
    try {
      const params = this.tripInputMapper(trip)
      const response = await this.put(`route/dispatch/`, params)
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: trip.tripId,
        }
      }
      return {
        success: false,
        message: 'something went wrong unable to update',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }
}
export default RouteApi
