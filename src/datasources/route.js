import { RESTDataSource } from 'apollo-datasource-rest'
import { routeReducer } from './reducers'

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

  async dispatchDraying({ trip }) {
    const path = `route/dispatch`
    const messagesMapper = message => {
      return {
        Body: message.body,
      }
    }
    const params = {
      // DrayingTripId: null,
      DeliveryOrderDrayingId: trip.drayingId,
      TripActionId: trip.tripActionId,
      TripStatusId: trip.tripStatusId,
      Order: trip.orderId,
      // ModifiedBy: null
      // ModifiedOn: null
      // CreatedBy: null
      // CreatedOn: null
      // OrderRoute: null
      DriverId: trip.driverId,
      TripActionLocationId: trip.tripActionLocationId,
      // PaidByClient: PaidByClient
      StartLocationTypeId: trip.startLocationTypeId,
      EndLocationTypeId: trip.endLocationTypeId,
      // RouteId: null,
      // DrayingCosts: trip.drayingCosts,
      // TripAction: {TripActionId: null, Name: "", ShortName: "", Active: true}
      // Driver: {DriverId: null, Active: true, DefaultVehicleId: null, ExternalDriverId: null, FirstName: "",…}
      // StartLocationType: {LocationTypeId: null, Name: ""}
      // EndLocationType: {LocationTypeId: null, Name: ""}
      // TripStatus: {TripStatusId: null, Name: "", Order: null, Active: true}
      // TripActionLocation: {TripActionLocationId: null, Name: "", LoadTypeId: null, CurrentLocationTypeId: null,…}
      // DrayingTripLocations: trip.locations ? trip.locations : null,
      DrayingTripMessages: trip.tripMessages
        ? trip.tripMessages.map(messagesMapper)
        : null,
    }
    const response = await this.post(path, params)

    if (response.status) {
      return {
        success: true,
        message: 'success',
        updatedId: trip.id,
      }
    }
    return {
      success: false,
      message: 'Oops something went wrong, unable to dispatch',
      updatedId: false,
    }
  }
}
export default RouteApi
