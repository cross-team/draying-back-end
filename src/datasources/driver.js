import { RESTDataSource } from 'apollo-datasource-rest'
import {
  tripLocationReducer,
  idReducer,
  tripStatusReducer,
  driverReducer,
} from './reducers'
class DriverAPI extends RESTDataSource {
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

  driversCapacityReducer(driver) {
    const locationsReducer = locations => {
      return locations ? locations.map(tripLocationReducer) : null
    }
    const tripCapacityReducer = trip =>
      trip
        ? {
            id:
              trip.DrayingTripLocations.length > 0
                ? trip.DrayingTripLocations[0].DrayingTripId
                : 'No ID',
            companyName: trip.CompanyName,
            status: trip.TripStatus
              ? tripStatusReducer(trip.TripStatus)
              : idReducer(trip.TripStatusId),
            containerSize: trip.ContainerSize,
            containerType: trip.ContainerType,
            shippingLine: trip.ShippingLine,
            locations: locationsReducer(trip.DrayingTripLocations),
            timeZone: trip.TimeZone,
            timeZoneDstOffset: trip.TimeZoneDstOffset,
            timeZoneRawOffset: trip.TimeZoneRawOffset,
            currentRouteTime: trip.CurrentRouteTime,
            startTrip: trip.StartTrip,
            endTrip: trip.EndTrip,
            progress: trip.Progress,
            currentDestination: trip.CurrentDestination
              ? tripLocationReducer(trip.CurrentDestination)
              : null,
            lastDestination: trip.LastDestination
              ? tripLocationReducer(trip.LastDestination)
              : null,
          }
        : null
    return {
      id: driver.DriverId,
      firstName: driver.FirstName,
      lastName: driver.LastName,
      phone: driver.Phone,
      active: driver.Active,
      dailyWorkHours: driver.DailyWorkHours,
      capacityInfo: {
        startDateTime: driver.StartDateTime,
        endDateTime: driver.EndDateTime,
        capacity: driver.Capacity,
        pendingTripsCount: driver.PendingDrayingTripsCount,
        activeTripCapacity: tripCapacityReducer(driver.DrayingTrip),
      },
    }
  }

  async getDriversCapacity({
    date,
    orderBy = 'name',
    sortAsc = true,
    driverName,
  }) {
    let queryParams = {
      Sort: sortAsc,
      OrderBy: orderBy,
      RouteDate: date,
    }
    if (driverName) {
      queryParams = {
        ...queryParams,
        Name: driverName,
      }
    }
    const { data } = await this.get('driver/capacity', queryParams)

    let drivers = []
    if (data) {
      drivers = data
    }
    return Array.isArray(drivers)
      ? drivers.map(driver => this.driversCapacityReducer(driver))
      : []
  }

  async getAllDrivers({ active }) {
    let queryParams = {}
    if (typeof active !== 'undefined') {
      queryParams = {
        ...queryParams,
        Active: active ? 1 : 0,
      }
    }
    const { data } = await this.get('driver', queryParams)

    let drivers = []
    if (data) {
      drivers = data.drivers
    }
    return Array.isArray(drivers) ? drivers.map(driverReducer) : []
  }
}
export default DriverAPI
